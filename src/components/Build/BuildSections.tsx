import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Carousel } from "@mantine/carousel";
import { Container, Image, Title } from "@mantine/core";
import { SectionImage } from "@/data/builds";

export interface BuildSection {
  title: string;
  content: string;
  images?: SectionImage[];
}

export interface BuildSectionsProps {
  sections: BuildSection[];
}

function sanitizeMarkdown(content: string): string {
  return content
    .replace(/\r\n|\r/g, "\n") // Normalize newlines to "\n"
    .replace(/^\s+|\s+$/gm, "") // Trim leading/trailing spaces on each line
    .replace(/\n{2,}/g, "\n\n"); // Ensure double newlines for markdown paragraphs
}

export const BuildSections: React.FC<BuildSectionsProps> = ({ sections }) => {
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
              img: ({ src, alt }) => (
                <Image
                  radius="md"
                  fit="contain"
                  w="auto"
                  src={src}
                  alt={alt}
                  style={{
                    maxWidth: "100%",
                    margin: "1rem 0",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
              ),
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
                    <Image radius="md" src={image.src} alt={image.alt} />
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
