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
import { Section } from "@/data/types";
import ImageUpload from "../ImageUpload/ImageUpload";

interface SectionEditorProps {
  section: Section;
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
    <Stack
      gap="sm"
      bg="var(--mantine-color-default)"
      p="md"
      style={{
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <TextInput
        label="Section Title"
        value={section.title}
        onChange={(e) => onChange("title", e.target.value)}
        required
      />
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      {section._id && <ImageUpload sectionId={section._id} />}
      <Button color="red" variant="light" onClick={onRemove}>
        Remove Section
      </Button>
    </Stack>
  );
};

export default SectionEditor;
