"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface ShareSectionProps {
  /** 공유할 URL (절대 URL 권장) */
  url: string;
  /** 함께 보낼 텍스트 — 글 제목 / 사이트 슬로건 등 */
  title?: string;
  /**
   * compact: 아이콘만 작게 inline (홈, 블로그 홈)
   * card:    라벨 + 아이콘+이름 (글 페이지)
   */
  variant?: "compact" | "card";
  /** card 변형의 상단 라벨 */
  label?: string;
}

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ThreadsIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 192 192"
    fill="currentColor"
    aria-hidden
  >
    <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.057-14.123 5.184-6.6 8.462-15.157 9.91-25.96 5.946 3.59 10.354 8.314 12.794 13.998 4.151 9.66 4.394 25.519-8.532 38.434-11.327 11.317-24.945 16.214-45.531 16.367-22.832-.169-40.084-7.49-51.286-21.762C25.135 132.967 19.589 117.276 19.378 96c.211-21.276 5.757-36.967 16.487-46.624 11.202-14.272 28.454-21.593 51.286-21.762 22.992.171 40.547 7.519 52.184 21.84 5.715 7.027 10.045 15.762 12.875 25.94l16.769-4.471c-3.426-12.529-8.794-23.275-16.066-32.18C141.937 14.534 124.196 4.881 97.473 4.745c-26.685.142-44.232 9.83-58.27 27.094C26.105 47.625 19.516 65.624 19.282 96l.001.205c-.234 30.376 6.355 48.376 19.92 64.11 14.04 17.265 31.587 26.953 58.272 27.095 23.72-.123 40.435-6.34 54.213-20.16 18.022-18.084 17.476-40.766 11.532-54.673-4.265-9.972-12.397-18.075-23.583-23.589zm-43.011 28.083c-10.439.587-21.286-4.099-21.821-14.146-.396-7.45 5.301-15.762 22.467-16.752 1.966-.114 3.895-.169 5.789-.169 6.232 0 12.062.605 17.36 1.762-1.973 24.728-13.595 28.834-23.795 29.305z" />
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ShareSection({
  url,
  title = "",
  variant = "card",
  label = "공유하기",
}: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedinIcon />,
      hover: "hover:text-[#0a66c2]",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon />,
      hover: "hover:text-[#1877f2]",
    },
    {
      name: "Threads",
      href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
      icon: <ThreadsIcon />,
      hover: "hover:text-foreground",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <XIcon />,
      hover: "hover:text-foreground",
    },
  ];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard 권한 거부 등 무시
    }
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1" role="group" aria-label={label}>
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name}에 공유`}
            title={`${p.name}에 공유`}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent ${p.hover}`}
          >
            {p.icon}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="링크 복사"
          title={copied ? "복사됨!" : "링크 복사"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {copied ? <Check size={16} /> : <Link2 size={16} />}
        </button>
      </div>
    );
  }

  // card 변형
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <p className="mb-3 text-sm font-medium text-card-foreground">{label}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.name}에 공유`}
            className={`inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent ${p.hover}`}
          >
            {p.icon}
            {p.name}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="링크 복사"
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {copied ? <Check size={16} /> : <Link2 size={16} />}
          {copied ? "복사됨" : "링크 복사"}
        </button>
      </div>
    </div>
  );
}
