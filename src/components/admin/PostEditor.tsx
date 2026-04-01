"use client";

import { usePostEditor, type PostFormData } from "@/lib/hooks/usePostEditor";
import { PostContent } from "@/components/blog/PostContent";
import { EditorToolbar } from "@/components/admin/EditorToolbar";
import { EditorMeta } from "@/components/admin/EditorMeta";

interface PostEditorProps {
  initialData?: PostFormData;
}

export function PostEditor({ initialData }: PostEditorProps) {
  const editor = usePostEditor({ initialData });

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <EditorToolbar
        isEditing={editor.isEditing}
        showPreview={editor.showPreview}
        saving={editor.saving}
        publishing={editor.publishing}
        message={editor.message}
        onTogglePreview={() => editor.setShowPreview(!editor.showPreview)}
        onSave={() => editor.savePost(false)}
        onPublish={() => editor.savePost(true)}
      />

      <EditorMeta
        title={editor.title}
        slug={editor.slug}
        description={editor.description}
        tags={editor.tags}
        onTitleChange={editor.setTitle}
        onSlugChange={editor.setSlug}
        onDescriptionChange={editor.setDescription}
        onTagsChange={editor.setTags}
      />

      {/* 에디터 + 미리보기 */}
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${editor.showPreview ? "border-r border-zinc-200 dark:border-zinc-800" : ""}`}
        >
          <textarea
            value={editor.content}
            onChange={(e) => editor.setContent(e.target.value)}
            placeholder="마크다운으로 글을 작성하세요..."
            className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            spellCheck={false}
          />
        </div>

        {editor.showPreview && (
          <div className="flex-1 overflow-y-auto p-6">
            {editor.content ? (
              <PostContent content={editor.content} />
            ) : (
              <p className="text-sm text-zinc-400">
                왼쪽에 마크다운을 입력하면 미리보기가 표시됩니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
