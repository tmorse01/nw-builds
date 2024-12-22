import { Card, Group, Image, Text } from "@mantine/core";
import { IBuild } from "@/data/builds";
import { BuildTags } from "./Tags";

interface BuildOverviewProps {
  build: IBuild;
}

export const BuildOverview: React.FC<BuildOverviewProps> = ({ build }) => (
  <Card withBorder shadow="sm" radius="md">
    <Card.Section>
      <Image src={build.thumbnail} alt={build.name} height={200} />
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
  </Card>
);
