import { getSupabaseClient } from './supabaseClient';
import { DailyLog, QuestionProgress } from '../types';
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
  answeredMap: Record<string, QuestionAnswerRecord>;
  listeningAnswersMap: Record<string, { choice: string; isCorrect: boolean }>;
  savedMistakeIds: string[];
  questionProgress: Record<string, QuestionProgress>;
  dailyLogs: Record<string, DailyLog>;
  bestStreak: number;
}

export class SyncService {
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
   * Save user progress to the cloud (Supabase or Cloud KV)
   */
  public static async saveToCloud(payload: UserSyncPayload): Promise<{ success: boolean; method: string; error?: string }> {
    const supabase = getSupabaseClient();
    const passkey = payload.passkey || DEFAULT_PASSKEY;

    // 1. Try Supabase first if configured
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
        console.warn('Supabase save error (falling back to cloud sync):', error);
      } catch (err: any) {
        console.warn('Supabase exception (falling back to cloud sync):', err);
      }
    }

    // 2. Fallback to Cloud Object Store (Restful-API Cloud KV)
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
   * Load user progress from the cloud
   */
  public static async loadFromCloud(passkey: string): Promise<{ success: boolean; data?: UserSyncPayload; method: string; error?: string }> {
    const key = passkey || DEFAULT_PASSKEY;
    const supabase = getSupabaseClient();

    // 1. Try Supabase first
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('toeic_sync')
          .select('data, updated_at')
          .eq('passkey', key)
          .single();

        if (!error && data && data.data) {
          return { success: true, data: data.data as UserSyncPayload, method: 'supabase' };
        }
        console.warn('Supabase load notice (falling back to cloud sync):', error?.message);
      } catch (err) {
        console.warn('Supabase fetch exception:', err);
      }
    }

    // 2. Fallback to Cloud Object Store
    try {
      const objectId = await this.getCloudObjectId(key);
      if (!objectId) {
        return { success: false, method: 'cloud_kv', error: 'Chưa có bản ghi đồng bộ nào trên đám mây.' };
      }

      const res = await fetch(`${CLOUD_SYNC_ENDPOINT}/${objectId}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.data && json.data.answeredMap) {
          return { success: true, data: json.data as UserSyncPayload, method: 'cloud_kv' };
        }
      }
      return { success: false, method: 'cloud_kv', error: 'Không tìm thấy dữ liệu trên đám mây.' };
    } catch (err: any) {
      return { success: false, method: 'cloud_kv', error: err.message || 'Lỗi mạng khi tải dữ liệu đám mây.' };
    }
  }

  /**
   * Smart merge local and remote progress to avoid losing data
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

    return {
      passkey: local.passkey || remote.passkey || DEFAULT_PASSKEY,
      version: 1,
      lastUpdated: Date.now(),
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
