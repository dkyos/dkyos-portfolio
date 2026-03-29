import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, FileText, LogOut, ExternalLink } from "lucide-react";
import { getUser } from "@/lib/supabase/auth-server";
import { AdminLogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <aside className="flex w-56 flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <Link
            href="/admin"
            className="text-lg font-bold text-zinc-900 dark:text-zinc-100"
          >
            DKyos Admin
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-3">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="대시보드" />
          <SidebarLink href="/admin/posts" icon={FileText} label="글 관리" />
          <div className="my-2 border-t border-zinc-200 dark:border-zinc-800" />
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <ExternalLink size={16} />
            사이트 보기
          </Link>
          <AdminLogoutButton />
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 bg-white dark:bg-zinc-950">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}
