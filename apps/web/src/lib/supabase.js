import { createClient } from '@supabase/supabase-js';

const getSupabaseCredentials = () => {
  const localUrl = localStorage.getItem('quantico_supabase_url');
  const localKey = localStorage.getItem('quantico_supabase_anon_key');
  
  return {
    url: localUrl || import.meta.env.VITE_SUPABASE_URL || 'https://btkkrvztbeljpacdlpzc.supabase.co',
    key: localKey || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  };
};

const creds = getSupabaseCredentials();
const isValidKey = (k) => k && k.trim() !== '' && !k.includes('YOUR_SUPABASE_ANON_KEY') && !k.includes('your_supabase_anon_key');

export let supabase = creds.url && isValidKey(creds.key)
  ? createClient(creds.url, creds.key) 
  : null;

/**
 * Dynamically re-initializes Supabase client from Admin Modal.
 */
export function initializeSupabase(url, key) {
  if (url && isValidKey(key)) {
    localStorage.setItem('quantico_supabase_url', url);
    localStorage.setItem('quantico_supabase_anon_key', key);
    supabase = createClient(url, key);
    return true;
  }
  return false;
}

/**
 * Loads the active config from the 'quantico_config' table.
 * Falls back to local storage if unconfigured or on error.
 */
export async function getRemoteConfig() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('quantico_config')
      .select('config')
      .eq('id', 'global')
      .maybeSingle();

    if (error) {
      console.warn('Supabase: Error loading config, falling back to local.', error);
      return null;
    }
    return data ? data.config : null;
  } catch (err) {
    console.warn('Supabase: Network error, falling back to local.', err);
    return null;
  }
}

/**
 * Saves the active config to the 'quantico_config' table.
 */
export async function saveRemoteConfig(config) {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('quantico_config')
      .upsert({ id: 'global', config, updated_at: new Date().toISOString() });

    if (error) {
      console.error('Supabase: Error saving config.', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase: Network error saving config.', err);
    return false;
  }
}

/**
 * Uploads a file to Supabase Storage.
 * Returns the public URL of the uploaded asset, or null on error.
 */
export async function uploadMedia(bucketName, filePath, file) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Supabase Storage error:', error);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error('Supabase Storage exception:', err);
    return null;
  }
}

