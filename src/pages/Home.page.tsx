import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Text, Title } from "@mantine/core";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "../components/Welcome/Welcome";
import { builds } from "../data/builds";

export const HomePage: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Welcome />
      <ColorSchemeToggle />
      <Title order={1}>Builds</Title>
      <Grid>
        {builds.map((build) => (
          <Grid.Col key={build.id} span={12}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="xs">
                {build.name}
              </Title>
              <Text size="sm" mb="sm">
                Role: {build.role}
              </Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                component={Link}
                to={`/build/${build.id}`}
              >
                View Build
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};
