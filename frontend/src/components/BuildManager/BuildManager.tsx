import React, { useEffect, useState } from "react";
import { Button, Container, Stack, Title } from "@mantine/core";
import BuildEditor from "@/components/BuildEditor/BuildEditor";
import { createBuild, deleteBuild, fetchBuilds, updateBuild } from "@/data/api";
import { Build } from "@/data/types";

const BuildManager: React.FC = () => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [selectedBuild, setSelectedBuild] = useState<Build | null>(null);

  useEffect(() => {
    const loadBuilds = async () => {
      try {
        const data = await fetchBuilds();
        setBuilds(data);
      } catch (err) {
        console.error("Error fetching builds:", err);
      }
    };
    loadBuilds();
  }, []);

  const handleSaveBuild = async (build: Build) => {
    try {
      if (build._id) {
        await updateBuild(build._id, build);
        // alert("Build updated successfully");
      } else {
        const newBuild = await createBuild(build);
        setBuilds([...builds, newBuild]);
        // alert("Build created successfully");
      }
      setSelectedBuild(null);
    } catch (err) {
      //   console.error("Error saving build:", err);
      //   alert("Failed to save build");
    }
  };

  const handleDeleteBuild = async (id: string) => {
    try {
      await deleteBuild(id);
      setBuilds(builds.filter((build) => build._id !== id));
      //   alert("Build deleted successfully");
    } catch (err) {
      console.error("Error deleting build:", err);
      //   alert("Failed to delete build");
    }
  };

  return (
    <Container>
      <Title order={2}>Manage Builds</Title>

      <Stack gap="md">
        {builds.map((build) => (
          <div key={build._id} style={{ border: "1px solid #ddd", padding: "1rem" }}>
            <h3>{build.name}</h3>
            <p>{build.playstyle}</p>
            <Button onClick={() => setSelectedBuild(build)}>Edit</Button>
            <Button color="red" onClick={() => handleDeleteBuild(build._id!)}>
              Delete
            </Button>
          </div>
        ))}

        <Button onClick={() => setSelectedBuild({} as Build)}>Create New Build</Button>

        {selectedBuild && (
          <BuildEditor
            build={selectedBuild}
            onSave={handleSaveBuild}
            onCancel={() => setSelectedBuild(null)}
          />
        )}
      </Stack>
    </Container>
  );
};

export default BuildManager;
