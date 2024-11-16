"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import EditorToolbar from "./toolbar/editor-toolbar";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface EditorProps {
  name: string;
}

const RichTextEditor = ({ name }: EditorProps) => {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  if (!editor) return <></>;

  return (
    <div className="prose max-w-none w-full border border-input bg-background dark:prose-invert">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
