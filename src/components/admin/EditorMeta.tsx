"use client";

interface EditorMetaProps {
  title: string;
  slug: string;
  description: string;
  tags: string;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTagsChange: (value: string) => void;
}

const inputClass =
  "w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1.5 text-sm text-zinc-700 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300";

export function EditorMeta({
  title,
  slug,
  description,
  tags,
  onTitleChange,
  onSlugChange,
  onDescriptionChange,
  onTagsChange,
}: EditorMetaProps) {
  return (
    <div className="grid grid-cols-2 gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
      <div className="col-span-2">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="글 제목"
          className="w-full bg-transparent text-xl font-bold text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
        />
      </div>
      <div>
        <input
          type="text"
          value={slug}
          onChange={(e) => onSlugChange(e.target.value)}
          placeholder="slug (URL 경로)"
          className={inputClass}
        />
      </div>
      <div>
        <input
          type="text"
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          placeholder="태그 (쉼표 구분)"
          className={inputClass}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="글 요약 (SEO 설명)"
          className={inputClass}
        />
      </div>
    </div>
  );
}
