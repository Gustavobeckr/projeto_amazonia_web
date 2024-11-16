"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBarRichTextEditor from "./ToolBarRichTextEditor";
import Heading from "@tiptap/extension-heading";

export default function RichTextEditor({
  textContent,
  onChange,
}: {
  textContent: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: "text-lg font-bold",
          levels: [2],
        },
      }),
    ],
    content: textContent,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[250px] p-1 bg-back",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <ToolBarRichTextEditor editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
