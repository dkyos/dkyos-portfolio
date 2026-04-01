interface ShareButtonProps {
  platform: string;
  url: string;
}

export function ShareButton({ platform, url }: ShareButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    >
      {platform}
    </a>
  );
}
