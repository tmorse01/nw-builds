import { useQuery } from "@tanstack/react-query";
import { Card, Group, Image, Loader, Stack, Text, Title } from "@mantine/core";
import { fetchBuildThumbnail } from "@/data/builds";
import { Build } from "@/data/types";
import { PerkEditor } from "../BuildEditor/PerkEditor";
import { BuildAttributes } from "./BuildAttributes";
import { TableOfContents } from "./TableOfContents";
import { BuildTags } from "./Tags";

interface BuildOverviewProps {
  build: Build;
}

export const BuildOverview: React.FC<BuildOverviewProps> = ({ build }) => {
  // Fetch the thumbnail using React Query
  const { data: thumbnail, isLoading } = useQuery({
    queryKey: ["buildThumbnail", build._id],
    queryFn: () => fetchBuildThumbnail(build._id),
  });

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section>
        {isLoading ? (
          <Loader size="sm" mt="lg" />
        ) : (
          <Image
            src={thumbnail}
            alt={build.name}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            height={200}
          />
        )}
      </Card.Section>

      <Group mt="md">
        <Title order={2} style={{ margin: 0 }}>
          {build.name}
        </Title>
        <BuildTags tags={build.tags} />
      </Group>

      <Text c="dimmed" mt="sm" fz="sm">
        {build.playstyle}
      </Text>
      <Group mt="sm">
        <TableOfContents sections={build.sections} />
        <BuildAttributes attributes={build.attributes} />
        <Card withBorder shadow="sm" radius="md" w={300}>
          <Stack gap="xs">
            <PerkEditor value={build.perks} readOnly />
          </Stack>
        </Card>
      </Group>
    </Card>
  );
};
