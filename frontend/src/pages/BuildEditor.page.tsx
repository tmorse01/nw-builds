import { IconAlertCircle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Center, Loader, Text } from "@mantine/core";
import BuildEditor from "@/components/BuildEditor/BuildEditor";

const BuildEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: build,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["build", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/builds/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch build");
      }
      return response.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: "100vh" }}>
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="light">
          {error.message || "An error occurred while fetching the build."}
        </Alert>
      </Center>
    );
  }

  if (!build) {
    return (
      <Center style={{ height: "100vh" }}>
        <Text>No build found</Text>
      </Center>
    );
  }

  return (
    <BuildEditor build={build} onSave={() => {}} onCancel={() => navigate("/build-manager")} />
  );
};

export default BuildEditorPage;
