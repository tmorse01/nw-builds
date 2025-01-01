import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Container, Title } from "@mantine/core";

export interface BuildDetailsProps {
  details: string;
}

export const BuildDetails: React.FC<BuildDetailsProps> = ({ details }) => {
  return (
    <Container mt="xl">
      <Title order={2} mb="md">
        Build Details
      </Title>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={details}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt }) => (
            <img
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
    </Container>
  );
};
