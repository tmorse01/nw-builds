import { useQuery } from "@tanstack/react-query";
import { Card, Group, Image, Loader, Text } from "@mantine/core";
import { fetchBuildThumbnail } from "@/data/builds";
import { Build } from "@/data/types";
import { BuildAttributes } from "./BuildAttributes";
import { TableOfContents } from "./TableOfContents";
import { BuildTags } from "./Tags";

interface BuildOverviewProps {
  build: Build;
}

export const BuildOverview: React.FC<BuildOverviewProps> = ({ build }) => {
  // Fetch the thumbnail using React Query
  const { data: thumbnail, isLoading } = useQuery({
    queryKey: ["buildThumbnail", build.id],
    queryFn: () => fetchBuildThumbnail(build.id),
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
        <Text fw={500} fz="lg">
          {build.name}
        </Text>
        <BuildTags tags={build.tags} />
      </Group>

      <Text c="dimmed" mt="sm" fz="sm">
        {build.playstyle}
      </Text>
      <Group mt="sm">
        <TableOfContents sections={build.sections} />
        <BuildAttributes attributes={build.attributes} />
      </Group>
    </Card>
  );
};
