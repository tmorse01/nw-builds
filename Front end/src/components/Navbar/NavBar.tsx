import {
  IconAt,
  IconBlocks,
  IconFirstAidKit,
  IconInfoCircle,
  IconShield,
  IconSword,
} from "@tabler/icons-react";
import { Code, ScrollArea, Text } from "@mantine/core";
import { LinksGroup } from "../LinksGroup/LinksGroup";
import classes from "./Navbar.module.css";

const pages = [
  {
    label: "Builds",
    icon: IconBlocks,
    links: [
      { label: "Tank", link: "/builds/?tags=tank", icon: IconShield },
      { label: "Healer", link: "/builds/?tags=healer", icon: IconFirstAidKit },
      { label: "DPS", link: "/builds/?tags=dps", icon: IconSword },
    ],
  },
  { label: "About", link: "/about", icon: IconInfoCircle },
  { label: "Contact", link: "/contact", icon: IconAt },
];

export function Navbar() {
  const links = pages.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <Text size="xs">Built by Grimz</Text>
        <Code fw={700}>v0.0.1</Code>
      </div>
    </nav>
  );
}
