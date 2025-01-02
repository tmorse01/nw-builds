import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Anchor, Box, Card } from "@mantine/core";

export interface TableOfContentsProps {
  sections: { title: string }[];
  offset?: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  offset = -60, // Default offset for a fixed header
}) => {
  return (
    <Card withBorder shadow="sm" radius="md">
      <Box>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {sections.map((section, index) => (
            <li key={index}>
              <ScrollLink
                to={`section-${index}`}
                smooth
                offset={offset}
                duration={500}
                style={{
                  textDecoration: "none",
                  color: "#007BFF",
                  cursor: "pointer",
                }}
              >
                <Anchor>{section.title}</Anchor>
              </ScrollLink>
            </li>
          ))}
        </ul>
      </Box>
    </Card>
  );
};
