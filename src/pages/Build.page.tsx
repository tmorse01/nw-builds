import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Group, Text, Title } from "@mantine/core";
import { BuildAttributes } from "@/components/Build/BuildAttributes";
import { BuildOverview } from "@/components/Build/BuildOverview";
import { SkillTree } from "@/components/Build/SkillTree";
import { HeaderMenu } from "@/components/Header/HeaderMenu";
import { builds } from "../data/builds";

export const BuildPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const build = builds.find((b) => b.id === Number(id));

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
    <>
      <HeaderMenu />
      <Container>
        <BuildOverview build={build} />
        <BuildAttributes attributes={build.attributes} />
        <SkillTree />
      </Container>
    </>
  );
};
