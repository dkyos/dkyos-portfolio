import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

// 브라우저에서 사용하는 인증 클라이언트
export function createAuthBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
