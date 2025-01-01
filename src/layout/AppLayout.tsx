import { ReactNode } from "react";
import { IconWorldSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { AppShell, Burger, Group, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Navbar } from "../components/Navbar/NavBar";

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
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}