import { ReactNode, useState } from "react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import {
  Alert,
  AppShell,
  Burger,
  Button,
  Group,
  Image,
  Modal,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AceFavicon from "@/axefavicon.svg";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { BackToTop } from "@/components/Common/BackToTop";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Navbar from "../components/Navbar/NavBar";
import Footer from "./Footer";
import classes from "./AppLayout.module.css";

export function AppLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const [loginOpened, { open: openLogin, close: closeLogin }] = useDisclosure(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, handleLogin, handleLogout } = useAdminAuth();

  const onLoginSubmit = () => {
    if (handleLogin(password)) {
      setError("");
      setPassword("");
      closeLogin();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" align="center" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Image src={AceFavicon} alt="Ace Favicon" w={30} h={30} />
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
          </Group>
          <Group>
            {isAuthenticated ? (
              <Button color="red" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button onClick={openLogin}>Admin Login</Button>
            )}
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <Modal opened={loginOpened} onClose={closeLogin} title="Admin Login">
        <TextInput
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="md"
        />
        {error && (
          <Alert variant="light" color="red" title="Error" icon={<IconExclamationCircle />} mb="md">
            {error}
          </Alert>
        )}
        <Button onClick={onLoginSubmit} fullWidth>
          Submit
        </Button>
      </Modal>

      <AppShell.Navbar>
        <Navbar onNavigate={toggle} />
      </AppShell.Navbar>
      <AppShell.Main className={classes.main}>
        {children}
        <Footer />
      </AppShell.Main>
      <BackToTop />
    </AppShell>
  );
}
