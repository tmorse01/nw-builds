import React from "react";
import { CloseButton, Group, Stack, TextInput } from "@mantine/core";
import { Section } from "@/data/types";
import RichTextEditorComponent from "../Common/RichTextEditorComponent";
import SectionImageUpload from "../ImageUpload/SectionImageUpload";

interface SectionEditorProps {
  section: Section;
  onChange: (key: string, value: string) => void;
  onRemove: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, onChange, onRemove }) => {
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
      <Group justify="space-between">
        <TextInput
          label="Section Title"
          value={section.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
          placeholder="Enter section title"
        />
        <CloseButton onClick={onRemove} title="Remove Section" />
      </Group>
      <RichTextEditorComponent
        key={section._id}
        content={section.content}
        onChange={(value) => onChange("content", value)}
      />
      <SectionImageUpload sectionId={section._id} />
    </Stack>
  );
};

export default SectionEditor;
