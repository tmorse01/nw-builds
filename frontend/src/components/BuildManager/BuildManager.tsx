import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Group,
  Input,
  Loader,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { queryClient } from "@/App";
import { BuildCard } from "@/components/Build/BuildCard";
import { deleteBuild, fetchBuildList } from "@/data/builds";
import { Build } from "@/data/types";

const BuildManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteTarget, setDeleteTarget] = useState<Build | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: builds, isLoading } = useQuery({
    queryKey: ["buildList"],
    queryFn: () => loadBuilds(),
  });

  const loadBuilds = async () => {
    try {
      const response = await fetchBuildList();
      return response.builds;
    } catch (err) {
      console.error("Error fetching builds:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteBuild(deleteTarget.id!);
      queryClient.setQueryData(["buildList"], (data: any) => {
        return data.filter((build: Build) => build.id !== deleteTarget.id);
      });
      setDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Error deleting build:", err);
    }
  };
  console.log("builds: ", builds);
  const filteredBuilds = builds?.filter((build) =>
    build.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={2}>Manage Builds</Title>
          <Button onClick={() => navigate("/build-editor/new")} color="blue">
            + Add Build
          </Button>
        </Group>
        <Input
          placeholder="Search builds by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid>
          {isLoading && <Loader color="blue" />}
          {filteredBuilds?.map((build) => (
            <Grid.Col key={build.id} span={{ xs: 12, sm: 6, md: 4 }}>
              <BuildCard
                id={build.id}
                name={build.name}
                link={`/build-editor/${build.id}`}
                tags={build.tags}
                weapons={build.weapons}
                onEdit={() => navigate(`/build-editor/${build.id}`)}
                onDelete={() => {
                  setDeleteTarget(build);
                  setDeleteModalOpen(true);
                }}
                showActions
              />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
        centered
      >
        <Text>Are you sure you want to delete the build "{deleteTarget?.name}"?</Text>
        <Stack mt="md" gap="sm">
          <Button color="red" onClick={handleDelete}>
            Confirm Delete
          </Button>
          <Button variant="light" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default BuildManager;
