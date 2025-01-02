import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { BuildOverview } from "@/components/Build/BuildOverview";
import { BuildSections } from "@/components/Build/BuildSections";
import { SkillTree } from "@/components/Build/SkillTree";
import { listOfBuilds } from "../data/builds";

export const BuildPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const build = listOfBuilds.find((b) => b.id === id);

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
      {build.skills && <SkillTree skills={build.skills} />}
      <BuildSections sections={build.sections} />
    </Container>
  );
};
