// 로그인 페이지는 관리자 레이아웃 없이 렌더링
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
