import { IconAlertCircle } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Center, Loader, Text } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import BuildEditor from "@/components/BuildEditor/BuildEditor";
import { Build } from "@/data/types";

const BuildEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: build,
    error,
    loading,
  } = useFetch<Build>(id ? `${import.meta.env.VITE_API_BASE_URL}/api/builds/${id}` : "", {
    method: "GET",
  });

  if (loading) {
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
    <BuildEditor
      build={build}
      onSave={() => navigate("/build-manager")}
      onCancel={() => navigate("/build-manager")}
    />
  );
};

export default BuildEditorPage;
