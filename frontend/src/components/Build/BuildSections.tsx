import React from "react";
import { Card, Stack, Title } from "@mantine/core";
import RichTextEditorComponent from "@/components/Common/RichTextEditorComponent";
import { Section } from "@/data/types";
import { BuildSectionImageViewer } from "./BuildSectionImageViewer";

export interface BuildSectionsProps {
  sections: Section[];
}

export const BuildSections: React.FC<BuildSectionsProps> = ({ sections }) => {
  return (
    <Stack gap="md" mt="lg">
      {sections.map((section, index) => (
        <Card
          key={`section-${section._id}`}
          id={`section-${index}`}
          withBorder
          shadow="sm"
          radius="md"
        >
          <Stack gap="md">
            <Title order={3} mb="md">
              {section.title}
            </Title>
            <RichTextEditorComponent content={section.content} readOnly />
            <BuildSectionImageViewer images={section.images} />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};
