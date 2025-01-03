import React from "react";
import { Anchor, Box, Card } from "@mantine/core";

export interface TableOfContentsProps {
  sections: { title: string }[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  return (
    <Card withBorder shadow="sm" radius="md">
      <Box>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {sections.map((section, index) => (
            <li key={index}>
              <a
                href={`#section-${index}`}
                style={{
                  textDecoration: "none",
                  color: "#007BFF",
                  cursor: "pointer",
                }}
              >
                <Anchor component="span">{section.title}</Anchor>
              </a>
            </li>
          ))}
        </ul>
      </Box>
    </Card>
  );
};
