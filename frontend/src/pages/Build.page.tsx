import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Group, Loader, Text, Title } from "@mantine/core";
import { BuildOverview } from "@/components/Build/BuildOverview";
import { BuildSections } from "@/components/Build/BuildSections";
import { PageTitle } from "@/components/PageTitle";
import { fetchBuildById } from "@/data/builds";
import { Build } from "@/data/types";

export const BuildPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: build,
    isLoading,
    isError,
  } = useQuery<Build>({
    queryKey: ["build", id],
    queryFn: () => fetchBuildById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container>
        <Loader size="sm" mt="xl" />
      </Container>
    );
  }

  if (isError || !build) {
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
      {build ? (
        <PageTitle title={build.name || "Build Details"} />
      ) : (
        <PageTitle title="Loading Build..." />
      )}

      <BuildOverview build={build} />
      <BuildSections sections={build.sections} />
    </Container>
  );
};
