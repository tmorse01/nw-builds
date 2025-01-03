import React, { useState } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Collapse, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";

interface Link {
  label: string;
  link: string;
  icon: React.ElementType;
}

interface LinksGroupProps {
  label: string;
  icon: React.ElementType;
  links?: Link[];
  link?: string;
}

export function LinksGroup({ label, icon: Icon, links = [], link }: LinksGroupProps) {
  const [opened, setOpened] = useState(true);

  const hasLinks = links.length > 0;
  const toggle = () => setOpened((o) => !o);

  const items = links.map(({ label, link, icon: LinkIcon }) => (
    <Text
      key={label}
      component={Link}
      to={link}
      style={{
        textDecoration: "none",
        color: "inherit",
        paddingLeft: "1.5rem",
        display: "block",
        margin: "0.5rem 0",
      }}
    >
      <ThemeIcon size={20} variant="light" style={{ marginRight: "0.5rem" }}>
        <LinkIcon size={16} />
      </ThemeIcon>
      {label}
    </Text>
  ));

  if (!hasLinks && link) {
    return (
      <div style={{ padding: "0.5rem 1rem" }}>
        <Group>
          <ThemeIcon size={24} variant="light">
            <Icon size={18} />
          </ThemeIcon>
          <Text
            key={label}
            component={Link}
            to={link}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
              margin: "0.5rem 0",
            }}
          >
            {label}
          </Text>
        </Group>
      </div>
    );
  }

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
