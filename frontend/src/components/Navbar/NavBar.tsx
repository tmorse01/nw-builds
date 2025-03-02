import {
  IconBlocks,
  IconEdit,
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
  { label: "Build Manager", link: "/build-manager", icon: IconEdit },
  { label: "Tag Manager", link: "/tag-manager", icon: IconEdit },
  { label: "About", link: "/about", icon: IconInfoCircle },
];

interface NavbarProps {
  onNavigate: (link: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const links = pages.map((item) => (
    <LinksGroup {...item} key={item.label} onNavigate={onNavigate} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>{links}</ScrollArea>
    </nav>
  );
};

export default Navbar;
