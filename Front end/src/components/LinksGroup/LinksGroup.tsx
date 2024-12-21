import React, { useState } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Collapse, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";

interface Link {
  label: string;
  link: string;
}

interface LinksGroupProps {
  label: string;
  icon: React.ElementType;
  links?: Link[];
}

export function LinksGroup({ label, icon: Icon, links = [] }: LinksGroupProps) {
  const [opened, setOpened] = useState(false);

  const hasLinks = links.length > 0;
  const toggle = () => setOpened((o) => !o);

  const items = links.map((link) => (
    <Text
      key={link.label}
      component={Link}
      to={link.link}
      style={{
        textDecoration: "none",
        color: "inherit",
        paddingLeft: "1.5rem",
        display: "block",
        margin: "0.5rem 0",
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <div>
      <UnstyledButton
        onClick={hasLinks ? toggle : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          transition: "background-color 0.3s",
          cursor: "pointer",
          backgroundColor: opened ? "#f8f9fa" : "transparent",
        }}
      >
        <Group>
          <ThemeIcon size={24} variant="light">
            <Icon size={18} />
          </ThemeIcon>
          <Text>{label}</Text>
        </Group>
        {hasLinks && (opened ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />)}
      </UnstyledButton>

      {hasLinks && (
        <Collapse in={opened}>
          <div style={{ padding: "0.5rem 0" }}>{items}</div>
        </Collapse>
      )}
    </div>
  );
}
