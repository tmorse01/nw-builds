import React from "react";
import { Container, Stack, Title } from "@mantine/core";
import RichTextEditorComponent from "@/components/Common/RichTextEditorComponent";
import { Section } from "@/data/types";
import { BuildSectionImageViewer } from "./BuildSectionImageViewer";

export interface BuildSectionsProps {
  sections: Section[];
}

export const BuildSections: React.FC<BuildSectionsProps> = ({ sections }) => {
  return (
    <Container>
      {sections.map((section, index) => (
        <Stack
          key={`section-${index}`}
          id={`section-${index}`}
          bg="var(--mantine-color-default)"
          p="md"
          mt="lg"
          mb="lg"
          style={{
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <Title order={3} mb="md">
            {section.title}
          </Title>
          <RichTextEditorComponent content={section.content} readOnly />
          <BuildSectionImageViewer images={section.images} />
        </Stack>
      ))}
    </Container>
  );
};
