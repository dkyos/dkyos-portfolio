import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}

// 싱글턴 캐싱
let _serverClient: SupabaseClient<Database> | null = null;
let _readOnlyClient: SupabaseClient<Database> | null = null;

// 서버용 Supabase 클라이언트 (service role key 사용)
export function createServerClient(): SupabaseClient<Database> {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase 서비스 키가 설정되지 않았습니다");
  }
  if (!_serverClient) {
    _serverClient = createClient<Database>(supabaseUrl, supabaseServiceKey);
  }
  return _serverClient;
}

// 서버 컴포넌트용 읽기 전용 클라이언트 (anon key 사용)
export function createReadOnlyClient(): SupabaseClient<Database> | null {
  if (!isConfigured()) return null;
  if (!_readOnlyClient) {
    _readOnlyClient = createClient<Database>(supabaseUrl!, supabaseAnonKey!);
  }
  return _readOnlyClient;
}
