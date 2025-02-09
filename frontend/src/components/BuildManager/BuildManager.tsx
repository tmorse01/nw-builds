import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Input, Modal, Stack, Text, Title } from "@mantine/core";
import { BuildCard } from "@/components/Build/BuildCard";
import { deleteBuild, fetchBuilds } from "@/data/api";
import { Build } from "@/data/types";

const BuildManager: React.FC = () => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteTarget, setDeleteTarget] = useState<Build | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }
    try {
      await deleteBuild(deleteTarget._id!);
      setBuilds(builds.filter((build) => build._id !== deleteTarget._id));
      setDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      console.error("Error deleting build:", err);
    }
  };

  const filteredBuilds = builds.filter((build) =>
    build.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Stack gap="md">
        <Title order={2}>Manage Builds</Title>
        <Input
          placeholder="Search builds by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid>
          {filteredBuilds.map((build) => (
            <Grid.Col key={build._id} span={{ xs: 12, sm: 6, md: 4 }}>
              <BuildCard
                id={build._id}
                name={build.name}
                link={`/build-editor/${build._id}`}
                thumbnail={build.thumbnail}
                tags={build.tags}
                weapons={build.weapons}
                onEdit={() => navigate(`/build-editor/${build._id}`)}
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
