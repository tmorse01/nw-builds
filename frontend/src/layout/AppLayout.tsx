import { ReactNode } from "react";
import { IconWorldSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AppShell, Burger, Group, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { BackToTop } from "@/components/Common/BackToTop";
import { Navbar } from "../components/Navbar/NavBar";
import Footer from "./Footer";
import classes from "./AppLayout.module.css";

export function AppLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" align="center" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconWorldSearch size={30} /> {/* Replace with suitable logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title>
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: "pink", to: "yellow" }}
                style={{ cursor: "pointer" }}
              >
                NW Builds
              </Text>
            </Title>
          </Link>
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main className={classes.main}>
        {children}
        <Footer />
      </AppShell.Main>
      <BackToTop />
    </AppShell>
  );
}
