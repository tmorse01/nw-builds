import { useState } from "react";
import { IconExclamationCircle } from "@tabler/icons-react";
import { Alert, Button, Container, Stack, TextInput, Title } from "@mantine/core";
import BuildEditor from "@/components/BuildEditor/BuildEditor";

const ProtectedBuildEditor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedPassword = localStorage.getItem("adminPassword");
    return storedPassword === import.meta.env.VITE_ADMIN_PASSWORD;
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminPassword", password);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminPassword");
  };

  if (isAuthenticated) {
    return (
      <>
        <Button
          color="red"
          style={{ position: "absolute", top: 70, right: 10 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <BuildEditor />
      </>
    );
  }

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Stack align="center" gap="md" style={{ marginTop: "20vh" }}>
        <Title order={2}>Admin Login</Title>
        <TextInput
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Alert variant="light" color="red" title="Error" icon={<IconExclamationCircle />}>
            {error}
          </Alert>
        )}
        <Button onClick={handleLogin}>Submit</Button>
      </Stack>
    </Container>
  );
};

export default ProtectedBuildEditor;
