import { Link } from "react-router-dom";
import { Burger, Center, Container, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { ChevronDown } from "../Icons/ChevronDown";
import classes from "./HeaderMenu.module.css";

const links = [
  {
    link: "/",
    label: "Builds",
    links: [
      { link: "/builds/tank", label: "Tank" },
      { link: "/builds/healer", label: "Healer" },
      { link: "/builds/dps", label: "DPS" },
    ],
  },
  // {
  //   link: "#1",
  //   label: "Guides",
  //   links: [
  //     { link: "/guides/leveling", label: "Leveling" },
  //     { link: "/guides/crafting", label: "Crafting" },
  //     { link: "/guides/pvp", label: "PvP" },
  //     { link: "/guides/pve", label: "PvE" },
  //   ],
  // },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link to={item.link} style={{ textDecoration: "none" }}>
          {item.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <ColorSchemeToggle />
        </div>
      </Container>
    </header>
  );
}
