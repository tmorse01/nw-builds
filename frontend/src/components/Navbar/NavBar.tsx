import {
  IconBlocks,
  IconFirstAidKit,
  IconInfoCircle,
  IconList,
  IconShield,
  IconSword,
} from "@tabler/icons-react";
import { ScrollArea } from "@mantine/core";
import { LinksGroup } from "../LinksGroup/LinksGroup";
import classes from "./Navbar.module.css";

const pages = [
  {
    label: "Builds",
    icon: IconBlocks,
    links: [
      { label: "All", link: "/builds", icon: IconList },
      { label: "Tank", link: "/builds/?tags=tank", icon: IconShield },
      { label: "Healer", link: "/builds/?tags=healer", icon: IconFirstAidKit },
      { label: "DPS", link: "/builds/?tags=dps", icon: IconSword },
    ],
  },
  { label: "About", link: "/about", icon: IconInfoCircle },
];

export function Navbar() {
  const links = pages.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>{links}</ScrollArea>
    </nav>
  );
}
