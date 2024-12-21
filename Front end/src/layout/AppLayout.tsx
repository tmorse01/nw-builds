import { ReactNode } from "react";
import { IconWorldSearch } from "@tabler/icons-react";
import { AppShell, Burger, Group } from "@mantine/core";
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
