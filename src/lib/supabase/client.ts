import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// 브라우저용 Supabase 클라이언트 (anon key 사용)
export function createBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
