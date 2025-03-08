import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Box, Button, Container, Image, Title } from "@mantine/core";
import { BuildSectionImageViewer } from "./BuildSectionImageViewer";

export interface BuildSection {
  title: string;
  content: string;
  id?: string; // Adding id property for section identification
}

export interface BuildSectionsProps {
  sections: BuildSection[];
  buildId: string; // Adding buildId to identify which build these sections belong to
}

function sanitizeMarkdown(content: string): string {
  return content
    .replace(/\r\n|\r/g, "\n") // Normalize newlines to "\n"
    .replace(/^\s*(\S.*)?$/gm, (_, line) => (line ? line.trim() : "")) // Trim non-empty lines but preserve blank lines
    .replace(/\n{3,}/g, "\n\n") // Replace multiple blank lines with a single paragraph break
    .trim(); // Remove leading and trailing whitespace from the entire content
}

export const BuildSections: React.FC<BuildSectionsProps> = ({ sections, buildId }) => {
  const [expandedImages, setExpandedImages] = useState<Record<string, boolean>>({});

  const toggleImage = (src: string) => {
    setExpandedImages((prev) => ({
      ...prev,
      [src]: !prev[src],
    }));
  };

  return (
    <Container mt="xl">
      {sections.map((section, index) => (
        <div key={index} id={`section-${index}`} style={{ marginBottom: "2rem" }}>
          <Title order={3} mb="md">
            {section.title}
          </Title>
          <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={sanitizeMarkdown(section.content)}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ src, alt }) => {
                const isExpandable = alt?.startsWith("Expandable");
                const cleanAlt = alt?.replace(/^Expandable\s*/, "");
                if (isExpandable) {
                  return (
                    <Box>
                      <Button variant="outline" onClick={() => toggleImage(src || "")} mt="sm">
                        {expandedImages[src || ""] ? `Hide: ${cleanAlt}` : `Show: ${cleanAlt}`}
                      </Button>
                      {expandedImages[src || ""] && (
                        <Image
                          src={src}
                          alt={cleanAlt || "Image"}
                          w="auto"
                          radius="md"
                          fit="contain"
                          style={{
                            maxWidth: "100%",
                            marginTop: "1rem",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      )}
                    </Box>
                  );
                }

                return (
                  <Image
                    src={src}
                    alt={alt || "Image"}
                    radius="md"
                    fit="contain"
                    style={{
                      maxWidth: "100%",
                      marginTop: "1rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                );
              },
            }}
          />
          <BuildSectionImageViewer
            sectionId={section.id}
            buildId={buildId}
            onImageClick={toggleImage}
          />
        </div>
      ))}
    </Container>
  );
};
