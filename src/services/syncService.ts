import { getSupabaseClient, createCustomSupabaseClient } from './supabaseClient';
import { DailyLog, QuestionProgress, StudyMode } from '../types';
import { QuestionAnswerRecord } from '../store/useQuizStore';

export const DEFAULT_PASSKEY = 'vmax0109';
const CLOUD_SYNC_ENDPOINT = 'https://api.restful-api.dev/objects';
const PASSKEY_OBJECT_ID_KEY = 'toeic_cloud_sync_id_';
// Pre-registered cloud object ID for default passkey vmax0109 for instant cross-device connection
const DEFAULT_VMAX0109_OBJECT_ID = 'ff808181a09d98f701a0e5551e942924';

export interface UserSyncPayload {
  passkey: string;
  version: number;
  lastUpdated: number;
  // Study curriculum & current location
  activeTab?: 'practice' | 'listening' | 'results' | 'search';
  sourceFilter?: string;
  categoryFilter?: string;
  mode?: StudyMode;
  currentIndex?: number;
  listeningCurrentIndex?: number;
  listeningSelectedPart?: number | 'all';
  // Questions progress
  answeredMap: Record<string, QuestionAnswerRecord>;
  listeningAnswersMap: Record<string, { choice: string; isCorrect: boolean }>;
  savedMistakeIds: string[];
  questionProgress: Record<string, QuestionProgress>;
  dailyLogs: Record<string, DailyLog>;
  bestStreak: number;
}

export class SyncService {
  /**
   * Test connection to Supabase and check if toeic_sync table is ready
   */
  public static async testSupabaseConnection(url?: string, key?: string): Promise<{
    success: boolean;
    tableReady: boolean;
    message: string;
    details?: string;
  }> {
    let client = url && key ? createCustomSupabaseClient(url, key) : getSupabaseClient();
    if (!client) {
      return {
        success: false,
        tableReady: false,
        message: 'Chưa có cấu hình Supabase URL và Public Anon Key hợp lệ.',
      };
    }

    try {
      const { error } = await client
        .from('toeic_sync')
        .select('passkey, updated_at')
        .limit(1);

      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          return {
            success: true,
            tableReady: false,
            message: 'Đã kết nối được tới Supabase! Nhưng bạn cần chạy đoạn mã SQL bên dưới để tạo bảng "toeic_sync".',
            details: error.message,
          };
        }
        return {
          success: false,
          tableReady: false,
          message: `Lỗi truy vấn Supabase: ${error.message}`,
          details: error.details,
        };
      }

      return {
        success: true,
        tableReady: true,
        message: 'Kết nối Supabase thành công! Bảng "toeic_sync" đã sẵn sàng lưu kết quả học tập.',
      };
    } catch (err: any) {
      return {
        success: false,
        tableReady: false,
        message: err.message || 'Lỗi mạng khi kết nối tới Supabase.',
      };
    }
  }
  /**
   * Get or register a cloud sync object ID for a given passkey
   */
  private static async getCloudObjectId(passkey: string): Promise<string | null> {
    if (passkey === DEFAULT_PASSKEY) {
      return DEFAULT_VMAX0109_OBJECT_ID;
    }
    const stored = localStorage.getItem(`${PASSKEY_OBJECT_ID_KEY}${passkey}`);
    if (stored) return stored;

    try {
      const res = await fetch(CLOUD_SYNC_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `toeic_sync_${passkey}`,
          data: { passkey, initialized: true, createdAt: Date.now() },
        }),
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (json && json.id) {
        localStorage.setItem(`${PASSKEY_OBJECT_ID_KEY}${passkey}`, json.id);
        return json.id;
      }
    } catch (err) {
      console.warn('Could not register cloud object:', err);
    }
    return null;
  }

  /**
   * Save user progress and study curriculum to the cloud (Supabase or Cloud KV)
   */
  public static async saveToCloud(payload: UserSyncPayload): Promise<{
    success: boolean;
    method: string;
    error?: string;
    needsTableSetup?: boolean;
  }> {
    const supabase = getSupabaseClient();
    const passkey = payload.passkey || DEFAULT_PASSKEY;

    // 1. If Supabase is configured, use it directly as primary database
    if (supabase) {
      try {
        const { error } = await supabase
          .from('toeic_sync')
          .upsert(
            {
              passkey,
              data: payload,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'passkey' }
          );

        if (!error) {
          return { success: true, method: 'supabase' };
        }

        const isTableMissing = error.code === '42P01' || error.message?.includes('does not exist');
        console.warn('Supabase save error:', error);
        return {
          success: false,
          method: 'supabase',
          error: isTableMissing
            ? 'Chưa tạo bảng "toeic_sync" trên Supabase. Hãy chạy mã SQL trong SQL Editor.'
            : `Lỗi Supabase: ${error.message}`,
          needsTableSetup: isTableMissing,
        };
      } catch (err: any) {
        console.warn('Supabase exception:', err);
        return { success: false, method: 'supabase', error: err.message || 'Lỗi lưu Supabase' };
      }
    }

    // 2. Fallback to Cloud Object Store (Restful-API Cloud KV) ONLY when Supabase is NOT configured
    try {
      const objectId = await this.getCloudObjectId(passkey);
      if (!objectId) {
        return { success: false, method: 'none', error: 'Không thể tạo bản ghi đám mây.' };
      }

      const res = await fetch(`${CLOUD_SYNC_ENDPOINT}/${objectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `toeic_sync_${passkey}`,
          data: payload,
        }),
      });

      if (res.ok) {
        return { success: true, method: 'cloud_kv' };
      }
      return { success: false, method: 'cloud_kv', error: `Lỗi kết nối đám mây (HTTP ${res.status})` };
    } catch (err: any) {
      return { success: false, method: 'cloud_kv', error: err.message || 'Lỗi mạng khi lưu đám mây.' };
    }
  }

  /**
   * Load user progress and curriculum from the cloud
   */
  public static async loadFromCloud(passkey: string): Promise<{
    success: boolean;
    data?: UserSyncPayload;
    method: string;
    error?: string;
    needsTableSetup?: boolean;
    isNewPasskey?: boolean;
  }> {
    const key = passkey || DEFAULT_PASSKEY;
    const supabase = getSupabaseClient();

    // 1. If Supabase is configured, query directly with maybeSingle
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('toeic_sync')
          .select('data, updated_at')
          .eq('passkey', key)
          .maybeSingle();

        if (!error) {
          if (data && data.data) {
            return { success: true, data: data.data as UserSyncPayload, method: 'supabase' };
          }
          // Supabase is working and table exists, but no row yet for this passkey
          return { success: true, data: undefined, method: 'supabase', isNewPasskey: true };
        }

        const isTableMissing = error.code === '42P01' || error.message?.includes('does not exist');
        console.warn('Supabase load error:', error);
        return {
          success: false,
          method: 'supabase',
          error: isTableMissing
            ? 'Chưa tạo bảng "toeic_sync" trên Supabase. Hãy chạy mã SQL trong SQL Editor.'
            : `Lỗi Supabase: ${error.message}`,
          needsTableSetup: isTableMissing,
        };
      } catch (err: any) {
        console.warn('Supabase fetch exception:', err);
        return { success: false, method: 'supabase', error: err.message || 'Lỗi kết nối Supabase' };
      }
    }

    // 2. Fallback to Cloud Object Store ONLY when Supabase is NOT configured
    try {
      const objectId = await this.getCloudObjectId(key);
      if (!objectId) {
        return { success: false, method: 'cloud_kv', error: 'Chưa có bản ghi đồng bộ nào trên đám mây.' };
      }

      const res = await fetch(`${CLOUD_SYNC_ENDPOINT}/${objectId}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.data && (json.data.answeredMap || json.data.listeningAnswersMap || json.data.currentIndex !== undefined)) {
          return { success: true, data: json.data as UserSyncPayload, method: 'cloud_kv' };
        }
      }
      return { success: false, method: 'cloud_kv', error: 'Không tìm thấy dữ liệu trên đám mây.' };
    } catch (err: any) {
      return { success: false, method: 'cloud_kv', error: err.message || 'Lỗi mạng khi tải dữ liệu đám mây.' };
    }
  }

  /**
   * Smart merge local and remote progress and resume curriculum position
   */
  public static smartMerge(local: UserSyncPayload, remote: UserSyncPayload): UserSyncPayload {
    // Merge Reading answeredMap
    const mergedAnsweredMap: Record<string, QuestionAnswerRecord> = { ...local.answeredMap };
    for (const [qId, remoteRecord] of Object.entries(remote.answeredMap || {})) {
      if (!mergedAnsweredMap[qId] || (remoteRecord.timestamp && remoteRecord.timestamp > (mergedAnsweredMap[qId].timestamp || 0))) {
        mergedAnsweredMap[qId] = remoteRecord;
      }
    }

    // Merge Listening answers
    const mergedListeningAnswersMap = {
      ...(local.listeningAnswersMap || {}),
      ...(remote.listeningAnswersMap || {}),
    };

    // Merge saved mistakes (union set)
    const mistakeSet = new Set<string>([...(local.savedMistakeIds || []), ...(remote.savedMistakeIds || [])]);

    // Merge question progress
    const mergedQuestionProgress: Record<string, QuestionProgress> = { ...(local.questionProgress || {}) };
    for (const [qId, remoteQP] of Object.entries(remote.questionProgress || {})) {
      if (!mergedQuestionProgress[qId]) {
        mergedQuestionProgress[qId] = remoteQP;
      } else {
        const localQP = mergedQuestionProgress[qId];
        mergedQuestionProgress[qId] = {
          questionId: qId,
          wrongCount: Math.max(localQP.wrongCount || 0, remoteQP.wrongCount || 0),
          correctCount: Math.max(localQP.correctCount || 0, remoteQP.correctCount || 0),
          lastAttemptDate:
            (remoteQP.lastAttemptTimestamp || 0) > (localQP.lastAttemptTimestamp || 0)
              ? remoteQP.lastAttemptDate
              : localQP.lastAttemptDate,
          lastAttemptTimestamp: Math.max(localQP.lastAttemptTimestamp || 0, remoteQP.lastAttemptTimestamp || 0),
          lastResult:
            (remoteQP.lastAttemptTimestamp || 0) > (localQP.lastAttemptTimestamp || 0)
              ? remoteQP.lastResult
              : localQP.lastResult,
        };
      }
    }

    // Merge daily logs
    const mergedDailyLogs: Record<string, DailyLog> = { ...(local.dailyLogs || {}) };
    for (const [date, remoteLog] of Object.entries(remote.dailyLogs || {})) {
      if (!mergedDailyLogs[date]) {
        mergedDailyLogs[date] = remoteLog;
      } else {
        const localLog = mergedDailyLogs[date];
        mergedDailyLogs[date] = {
          date,
          totalAnswered: Math.max(localLog.totalAnswered, remoteLog.totalAnswered),
          correctCount: Math.max(localLog.correctCount, remoteLog.correctCount),
          wrongCount: Math.max(localLog.wrongCount, remoteLog.wrongCount),
          timeoutCount: Math.max(localLog.timeoutCount, remoteLog.timeoutCount),
          mistakes: Array.from(new Set([...(localLog.mistakes || []), ...(remoteLog.mistakes || [])])),
          notes: remoteLog.lastUpdated > localLog.lastUpdated ? remoteLog.notes : localLog.notes,
          lastUpdated: Math.max(localLog.lastUpdated, remoteLog.lastUpdated),
        };
      }
    }

    // Pick curriculum location from the most recently updated side
    const remoteIsNewer = (remote.lastUpdated || 0) >= (local.lastUpdated || 0);
    const chosenActiveTab = remoteIsNewer && remote.activeTab ? remote.activeTab : local.activeTab || 'practice';
    const chosenSourceFilter = remoteIsNewer && remote.sourceFilter ? remote.sourceFilter : local.sourceFilter || 'stage_1';
    const chosenCategoryFilter = remoteIsNewer && remote.categoryFilter ? remote.categoryFilter : local.categoryFilter || 'all';
    const chosenMode = remoteIsNewer && remote.mode ? remote.mode : local.mode || 'sequential';
    const chosenCurrentIndex = remoteIsNewer && remote.currentIndex !== undefined ? remote.currentIndex : (local.currentIndex ?? 0);
    const chosenListeningIndex = remoteIsNewer && remote.listeningCurrentIndex !== undefined ? remote.listeningCurrentIndex : (local.listeningCurrentIndex ?? 0);
    const chosenListeningPart = remoteIsNewer && remote.listeningSelectedPart !== undefined ? remote.listeningSelectedPart : (local.listeningSelectedPart ?? 'all');

    return {
      passkey: local.passkey || remote.passkey || DEFAULT_PASSKEY,
      version: 2,
      lastUpdated: Math.max(local.lastUpdated || 0, remote.lastUpdated || 0, Date.now()),
      activeTab: chosenActiveTab,
      sourceFilter: chosenSourceFilter,
      categoryFilter: chosenCategoryFilter,
      mode: chosenMode,
      currentIndex: chosenCurrentIndex,
      listeningCurrentIndex: chosenListeningIndex,
      listeningSelectedPart: chosenListeningPart,
      answeredMap: mergedAnsweredMap,
      listeningAnswersMap: mergedListeningAnswersMap,
      savedMistakeIds: Array.from(mistakeSet),
      questionProgress: mergedQuestionProgress,
      dailyLogs: mergedDailyLogs,
      bestStreak: Math.max(local.bestStreak || 0, remote.bestStreak || 0),
    };
  }

  /**
   * Export all data as a downloadable JSON file
   */
  public static exportToFile(payload: UserSyncPayload) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadAnchor.setAttribute('download', `toeic_cheat_sync_${payload.passkey}_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}
