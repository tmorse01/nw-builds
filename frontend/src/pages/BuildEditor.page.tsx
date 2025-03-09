import { IconAlertCircle } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import ObjectId from "bson-objectid";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Center, Loader, Text } from "@mantine/core";
import BuildEditor from "@/components/BuildEditor/BuildEditor";
import { Build } from "@/data/types";

const BuildEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Handle new build creation
  const isNewBuild = id === "new";

  const {
    data: build,
    error,
    isLoading,
  } = useQuery<Build>({
    queryKey: ["build", id],
    queryFn: async () => {
      if (!id || isNewBuild) return null; // Don't fetch if it's a new build
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/builds/${id}`);
      if (!response.ok) throw new Error("Failed to fetch build");
      return response.json();
    },
    enabled: !!id && !isNewBuild, // Prevent API call if it's a new build
  });

  if (isNewBuild) {
    // Pre-generate a MongoDB ObjectId for the new build
    const newBuild: Build = {
      _id: new ObjectId().toHexString(),
      name: "",
      weapons: [],
      attributes: {
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        focus: 5,
        constitution: 5,
      },
      playstyle: "",
      tags: [],
      sections: [],
      perks: [],
      createdBy: "",
      season: 7, // Default to current season
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return (
      <BuildEditor build={newBuild} onSave={() => {}} onCancel={() => navigate("/build-manager")} />
    );
  }

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
