import React from "react";
import { Code, Group, Text } from "@mantine/core";

const Footer: React.FC = () => {
  return (
    <footer
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}
    >
      <Group>
        <Text size="xs">Built by Grimz</Text>
        <Code fw={700}>
          <Text size="xs" c="dimmed">
            &copy; {new Date().getFullYear()} NW Builds | v{import.meta.env.PACKAGE_VERSION}
          </Text>
        </Code>
      </Group>
    </footer>
  );
};

export default Footer;
