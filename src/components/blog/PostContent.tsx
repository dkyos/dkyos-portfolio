import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-zinc-900 prose-a:underline-offset-4 dark:prose-a:text-zinc-100 prose-pre:bg-zinc-950 prose-pre:dark:bg-zinc-900">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
