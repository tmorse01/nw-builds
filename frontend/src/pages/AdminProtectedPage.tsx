import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Text, Title } from "@mantine/core";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminProtectedPageProps {
  children: React.ReactNode;
}

const AdminProtectedPage = ({ children }: AdminProtectedPageProps) => {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Stack align="center" gap="md" style={{ marginTop: "20vh" }}>
          <Title order={2}>Access Denied</Title>
          <Text>You need to login as an administrator to access this page.</Text>
        </Stack>
      </Container>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedPage;
