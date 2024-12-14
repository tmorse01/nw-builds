import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Group, List, Text, Title } from "@mantine/core";
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
    <Container>
      <Group mt="md" mb="lg">
        <Title>{build.name}</Title>
        <Button component={Link} to="/" variant="outline">
          Back to Home
        </Button>
      </Group>

      <Text size="lg" mb="md">
        <strong>Role:</strong> {build.role}
      </Text>

      <Title order={2} mt="lg" mb="sm">
        Weapons
      </Title>
      <List>
        {build.weapons.map((weapon) => (
          <List.Item key={weapon}>{weapon}</List.Item>
        ))}
      </List>

      <Title order={2} mt="lg" mb="sm">
        Attributes
      </Title>
      <List>
        {Object.entries(build.attributes).map(([attribute, value]) => (
          <List.Item key={attribute}>
            {attribute}: {value}
          </List.Item>
        ))}
      </List>

      <Title order={2} mt="lg" mb="sm">
        Gear
      </Title>
      <List>
        {build.gear.map((item) => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List>

      <Title order={2} mt="lg" mb="sm">
        Perks
      </Title>
      <List>
        {build.perks.map((perk) => (
          <List.Item key={perk}>{perk}</List.Item>
        ))}
      </List>

      <Title order={2} mt="lg" mb="sm">
        Gems
      </Title>
      <List>
        {build.gems.map((gem) => (
          <List.Item key={gem}>{gem}</List.Item>
        ))}
      </List>

      <Title order={2} mt="lg" mb="sm">
        Playstyle
      </Title>
      <Text>{build.playstyle}</Text>
    </Container>
  );
};
