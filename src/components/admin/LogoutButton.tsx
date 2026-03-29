"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createAuthBrowserClient } from "@/lib/supabase/auth-client";

export function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createAuthBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800"
    >
      <LogOut size={16} />
      로그아웃
    </button>
  );
}
