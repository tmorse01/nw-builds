import React from "react";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Stack, TextInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";

interface SectionEditorProps {
  section: { title: string; content: string };
  onChange: (key: string, value: string) => void;
  onRemove: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, onChange, onRemove }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Superscript,
      Subscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: section.content,
    onUpdate: ({ editor }) => onChange("content", editor.getHTML()),
  });

  return (
    <Stack gap="sm" style={{ border: "1px solid #ddd", padding: "1rem" }}>
      <TextInput
        label="Section Title"
        value={section.title}
        onChange={(e) => onChange("title", e.target.value)}
        required
      />
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>

      <Button color="red" onClick={onRemove}>
        Remove Section
      </Button>
    </Stack>
  );
};

export default SectionEditor;
