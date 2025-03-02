import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { BuildOverview } from "@/components/Build/BuildOverview";

// import { BuildSections } from "@/components/Build/BuildSections";

// import { listOfBuilds } from "../data/builds";

export const BuildPage: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  // const build = listOfBuilds.find((b) => b._id === id);
  const build = null;
  if (!build) {
    return (
      <Container>
        <Title mt="xl">Build Not Found</Title>
        <Text mt="md">The build you are looking for does not exist.</Text>
        <Group mt="lg">
          <Button component={Link} to="/" variant="outline">
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  return (
    <Container>
      <BuildOverview build={build} />
      {/* <BuildSections sections={build.sections} /> */}
    </Container>
  );
};
