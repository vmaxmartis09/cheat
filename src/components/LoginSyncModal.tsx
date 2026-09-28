import React, { useState } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { DEFAULT_PASSKEY, SyncService, UserSyncPayload } from '../services/syncService';
import { getSupabaseConfig, saveSupabaseConfig } from '../services/supabaseClient';
import {
  Cloud,
  CheckCircle2,
  Key,
  Database,
  Download,
  Upload,
  X,
  Copy,
  Check,
  AlertCircle,
  Laptop,
  Smartphone,
  LogOut,
} from 'lucide-react';

interface LoginSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginSyncModal: React.FC<LoginSyncModalProps> = ({ isOpen, onClose }) => {
  const {
    userPasskey,
    isLoggedIn,
    syncStatus,
    lastSyncedAt,
    loginWithPasskey,
    logoutPasskey,
    syncToCloud,
    pullFromCloud,
    importFromJson,
    answeredMap,
    listeningAnswersMap,
    savedMistakeIds,
    questionProgress,
    dailyLogs,
    bestStreak,
  } = useQuizStore();

  const [activeTab, setActiveTab] = useState<'passkey' | 'supabase' | 'backup'>('passkey');
  const [passkeyInput, setPasskeyInput] = useState<string>(userPasskey || DEFAULT_PASSKEY);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Supabase state
  const supabaseCfg = getSupabaseConfig();
  const [sbUrl, setSbUrl] = useState<string>(supabaseCfg.url);
  const [sbKey, setSbKey] = useState<string>(supabaseCfg.key);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  if (!isOpen) return null;

  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogin = async () => {
    if (!passkeyInput.trim()) {
      showMsg('Vui lòng nhập Passkey!', 'error');
      return;
    }
    setActionLoading(true);
    try {
      const ok = await loginWithPasskey(passkeyInput.trim());
      if (ok) {
        showMsg(`Đã kết nối với Passkey "${passkeyInput.trim()}" và tải dữ liệu đám mây thành công!`, 'success');
      } else {
        showMsg(`Đã lưu Passkey "${passkeyInput.trim()}". (Chưa có dữ liệu cũ trên đám mây)`, 'success');
      }
    } catch (err: any) {
      showMsg(err.message || 'Lỗi kết nối đám mây.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSyncToCloud = async () => {
    setActionLoading(true);
    try {
      const ok = await syncToCloud();
      if (ok) {
        showMsg('Đã tải lên và đồng bộ dữ liệu đám mây thành công!', 'success');
      } else {
        showMsg('Đồng bộ không thành công. Vui lòng kiểm tra kết nối mạng.', 'error');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handlePullFromCloud = async () => {
    setActionLoading(true);
    try {
      const ok = await pullFromCloud();
      if (ok) {
        showMsg('Đã kéo dữ liệu mới nhất từ đám mây về máy này thành công!', 'success');
      } else {
        showMsg('Không tìm thấy dữ liệu trên đám mây hoặc lỗi mạng.', 'error');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveSupabase = () => {
    saveSupabaseConfig(sbUrl, sbKey);
    showMsg('Đã lưu cấu hình Supabase! Hệ thống sẽ ưu tiên lưu vào bảng "toeic_sync".', 'success');
  };

  const handleExport = () => {
    const payload: UserSyncPayload = {
      passkey: userPasskey || DEFAULT_PASSKEY,
      version: 1,
      lastUpdated: Date.now(),
      answeredMap,
      listeningAnswersMap,
      savedMistakeIds,
      questionProgress,
      dailyLogs,
      bestStreak,
    };
    SyncService.exportToFile(payload);
    showMsg('Đã tải xuống file sao lưu JSON!', 'success');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const ok = importFromJson(json);
        if (ok) {
          showMsg('Đã nhập và hợp nhất dữ liệu thành công!', 'success');
        } else {
          showMsg('File JSON không đúng định dạng.', 'error');
        }
      } catch (err) {
        showMsg('Lỗi đọc file JSON.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const copySqlCode = () => {
    const sql = `-- Chạy câu lệnh này trong SQL Editor của Supabase:
create table if not exists toeic_sync (
  passkey text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table toeic_sync enable row level security;

create policy "Allow all public" on toeic_sync
  for all using (true) with check (true);`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const totalReading = Object.keys(answeredMap).length;
  const totalListening = Object.keys(listeningAnswersMap).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl border border-[#EAE3D8] w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE3D8] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#262320]">
                Đồng Bộ Đám Mây & Thiết Bị
              </h3>
              <p className="text-xs text-[#7A7268]">
                Đồng bộ kết quả học giữa Điện thoại, Máy tính & iPad
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/5 text-[#7A7268] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message banner */}
        {message && (
          <div
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-b border-rose-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Tab switch */}
        <div className="flex border-b border-[#EAE3D8] bg-[#F7F3EE] px-4 pt-2 gap-1">
          <button
            onClick={() => setActiveTab('passkey')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'passkey'
                ? 'bg-white text-amber-900 border-t-2 border-amber-600 shadow-2xs'
                : 'text-[#6A625A] hover:text-[#262320]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Passkey Sync</span>
          </button>
          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'supabase'
                ? 'bg-white text-amber-900 border-t-2 border-amber-600 shadow-2xs'
                : 'text-[#6A625A] hover:text-[#262320]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase</span>
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-2 text-xs font-bold rounded-t-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'backup'
                ? 'bg-white text-amber-900 border-t-2 border-amber-600 shadow-2xs'
                : 'text-[#6A625A] hover:text-[#262320]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sao Lưu File</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* TAB 1: PASSKEY */}
          {activeTab === 'passkey' && (
            <div className="space-y-4">
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EAE3D8] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-1 text-[#5A5248]">
                    <Smartphone className="w-5 h-5 text-amber-700" />
                    <Laptop className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#262320]">
                      Tài khoản liên kết thiết bị
                    </div>
                    <div className="text-[11px] text-[#7A7268]">
                      Nhập Passkey <strong>vmax0109</strong> trên bất kỳ máy nào để đồng bộ ngay.
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {syncStatus === 'syncing' ? 'Đang đồng bộ...' : 'Sẵn sàng'}
                </span>
              </div>

              {/* Passkey input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#4A4238] block">
                  Passkey bảo mật:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="Nhập passkey (vd: vmax0109)"
                    className="flex-1 px-3 py-2 text-sm rounded-xl border border-[#DCD3C7] focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 bg-white font-mono"
                  />
                  <button
                    onClick={handleLogin}
                    disabled={actionLoading}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-2xs transition cursor-pointer disabled:opacity-50"
                  >
                    {actionLoading ? 'Đang tải...' : 'Lưu & Kết Nối'}
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#7A7268] pt-1">
                  <span>Passkey mặc định: <strong className="text-amber-800">vmax0109</strong></span>
                  <div className="flex items-center gap-2">
                    {passkeyInput !== DEFAULT_PASSKEY && (
                      <button
                        onClick={() => setPasskeyInput(DEFAULT_PASSKEY)}
                        className="text-amber-700 hover:underline cursor-pointer font-semibold"
                      >
                        Điền nhanh vmax0109
                      </button>
                    )}
                    {isLoggedIn && (
                      <button
                        onClick={() => {
                          logoutPasskey();
                          showMsg('Đã đăng xuất thiết bị.', 'success');
                        }}
                        className="text-rose-600 hover:underline cursor-pointer font-semibold flex items-center gap-0.5"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Đăng xuất</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Summary on Current Device */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col">
                  <span className="text-[#7A7268] text-[11px]">Đã làm (Reading)</span>
                  <strong className="text-base text-[#262320]">{totalReading} câu</strong>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col">
                  <span className="text-[#7A7268] text-[11px]">Đã làm (Listening)</span>
                  <strong className="text-base text-[#262320]">{totalListening} câu</strong>
                </div>
              </div>

              {/* Sync Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleSyncToCloud}
                  disabled={actionLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#262320] hover:bg-black text-white text-xs font-bold transition cursor-pointer disabled:opacity-50 shadow-2xs"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Đồng bộ lên Đám mây (Push)</span>
                </button>
                <button
                  onClick={handlePullFromCloud}
                  disabled={actionLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-[#DCD3C7] hover:bg-amber-50/50 text-[#262320] text-xs font-bold transition cursor-pointer disabled:opacity-50 shadow-2xs"
                >
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>Tải về từ Đám mây (Pull)</span>
                </button>
              </div>

              {lastSyncedAt && (
                <div className="text-center text-[11px] text-[#7A7268]">
                  Lần đồng bộ gần nhất: {new Date(lastSyncedAt).toLocaleString('vi-VN')}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SUPABASE */}
          {activeTab === 'supabase' && (
            <div className="space-y-4 text-xs">
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 text-[#3A3228] leading-relaxed">
                Hệ thống tự động sử dụng Cloud Sync với Passkey <strong>vmax0109</strong>. Nếu bạn muốn lưu trực tiếp vào cơ sở dữ liệu Supabase riêng của bạn, hãy nhập thông tin bên dưới:
              </div>

              <div className="space-y-3">
                <div>
                  <label className="font-bold text-[#4A4238] block mb-1">
                    Supabase Project URL:
                  </label>
                  <input
                    type="text"
                    value={sbUrl}
                    onChange={(e) => setSbUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full px-3 py-2 rounded-xl border border-[#DCD3C7] focus:outline-none focus:ring-2 focus:ring-amber-500/30 bg-white font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A4238] block mb-1">
                    Supabase Anon Public Key:
                  </label>
                  <input
                    type="password"
                    value={sbKey}
                    onChange={(e) => setSbKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3 py-2 rounded-xl border border-[#DCD3C7] focus:outline-none focus:ring-2 focus:ring-amber-500/30 bg-white font-mono text-xs"
                  />
                </div>

                <button
                  onClick={handleSaveSupabase}
                  className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition cursor-pointer shadow-2xs"
                >
                  Lưu Cấu Hình Supabase
                </button>
              </div>

              {/* SQL Setup Instruction */}
              <div className="pt-2 border-t border-[#EAE3D8]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#4A4238]">Mã SQL tạo bảng trên Supabase:</span>
                  <button
                    onClick={copySqlCode}
                    className="flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-bold cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Đã sao chép!' : 'Sao chép SQL'}</span>
                  </button>
                </div>
                <pre className="p-2.5 rounded-xl bg-gray-900 text-gray-200 font-mono text-[10px] overflow-x-auto leading-relaxed">
{`create table if not exists toeic_sync (
  passkey text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table toeic_sync enable row level security;

create policy "Allow all public" on toeic_sync
  for all using (true) with check (true);`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP FILE */}
          {activeTab === 'backup' && (
            <div className="space-y-4 text-xs">
              <p className="text-[#6A625A] leading-relaxed">
                Bạn có thể tải toàn bộ tiến trình học, lịch sử câu đúng/sai, ghi chú và danh sách câu cần ôn về máy thành file <code>.json</code> để lưu trữ an toàn hoặc chuyển máy mà không cần mạng.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleExport}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#DCD3C7] bg-[#FAF8F5] hover:bg-amber-50/60 transition cursor-pointer gap-2"
                >
                  <Download className="w-6 h-6 text-amber-700" />
                  <span className="font-bold text-[#262320]">Xuất File JSON</span>
                  <span className="text-[10px] text-[#7A7268] text-center">
                    Tải về máy file sao lưu đầy đủ
                  </span>
                </button>

                <label className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-[#DCD3C7] bg-white hover:bg-gray-50 transition cursor-pointer gap-2">
                  <Upload className="w-6 h-6 text-[#5A5248]" />
                  <span className="font-bold text-[#262320]">Nhập File JSON</span>
                  <span className="text-[10px] text-[#7A7268] text-center">
                    Chọn file .json từ máy để phục hồi
                  </span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#EAE3D8] bg-[#FAF8F5] flex items-center justify-between">
          <span className="text-[11px] text-[#7A7268]">
            Tự động lưu khi làm bài: <strong className="text-emerald-700">Bật</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-[#262320] text-xs font-bold transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
