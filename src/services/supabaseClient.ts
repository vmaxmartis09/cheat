import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_STORAGE_URL_KEY = 'toeic_custom_supabase_url';
const SUPABASE_STORAGE_ANON_KEY = 'toeic_custom_supabase_anon_key';

export const getSupabaseConfig = () => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  const storedUrl = typeof window !== 'undefined' ? localStorage.getItem(SUPABASE_STORAGE_URL_KEY) || '' : '';
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem(SUPABASE_STORAGE_ANON_KEY) || '' : '';

  return {
    url: storedUrl || envUrl,
    key: storedKey || envKey,
    isCustom: Boolean(storedUrl || storedKey),
  };
};

export const saveSupabaseConfig = (url: string, key: string) => {
  if (typeof window === 'undefined') return;
  if (url) {
    localStorage.setItem(SUPABASE_STORAGE_URL_KEY, url.trim());
  } else {
    localStorage.removeItem(SUPABASE_STORAGE_URL_KEY);
  }

  if (key) {
    localStorage.setItem(SUPABASE_STORAGE_ANON_KEY, key.trim());
  } else {
    localStorage.removeItem(SUPABASE_STORAGE_ANON_KEY);
  }
};

export const createCustomSupabaseClient = (url: string, key: string): SupabaseClient | null => {
  if (!url || !key) return null;
  try {
    return createClient(url.trim(), key.trim());
  } catch (err) {
    console.error('Failed to initialize custom Supabase client:', err);
    return null;
  }
};

let cachedClient: SupabaseClient | null = null;
let lastUsedUrl = '';
let lastUsedKey = '';

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;

  if (cachedClient && lastUsedUrl === url && lastUsedKey === key) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, key);
    lastUsedUrl = url;
    lastUsedKey = key;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};
