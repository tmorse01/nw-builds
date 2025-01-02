import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Carousel } from "@mantine/carousel";
import { Box, Button, Container, Image, Title } from "@mantine/core";

export interface BuildSection {
  title: string;
  content: string;
  images?: { src: string; alt: string }[];
}

export interface BuildSectionsProps {
  sections: BuildSection[];
}

function sanitizeMarkdown(content: string): string {
  return content
    .replace(/\r\n|\r/g, "\n") // Normalize newlines to "\n"
    .replace(/^\s*(\S.*)?$/gm, (_, line) => (line ? line.trim() : "")) // Trim non-empty lines but preserve blank lines
    .replace(/\n{3,}/g, "\n\n") // Replace multiple blank lines with a single paragraph break
    .trim(); // Remove leading and trailing whitespace from the entire content
}

export const BuildSections: React.FC<BuildSectionsProps> = ({ sections }) => {
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
        <div key={index} style={{ marginBottom: "2rem" }}>
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
          {section.images && (
            <>
              <Title order={4} mt="lg" mb="md">
                Examples
              </Title>
              <Carousel
                withIndicators
                loop
                align="start"
                slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
                slideGap={{ base: 0, sm: "md" }}
              >
                {section.images.map((image, index) => (
                  <Carousel.Slide key={index}>
                    <Image
                      radius="md"
                      src={image.src}
                      alt={image.alt}
                      onClick={() => toggleImage(image.src)}
                      style={{ cursor: "pointer" }}
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </>
          )}
        </div>
      ))}
    </Container>
  );
};
