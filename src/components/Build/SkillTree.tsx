import { Badge, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core";

interface SkillTreeProps {
  skills: {
    name: string;
    type: string;
    description: string;
  }[];
}

export const SkillTree: React.FC<SkillTreeProps> = ({ skills }) => (
  <Stack mt="lg">
    <Text fw={600} fz="lg">
      Skill Tree
    </Text>
    <SimpleGrid cols={3} spacing="lg">
      {skills.map((skill) => (
        <Card key={skill.name} withBorder shadow="sm" radius="md">
          <Group mb="sm">
            <Text fw={500} fz="md">
              {skill.name}
            </Text>
            <Badge color={skill.type === "Active" ? "blue" : "green"}>{skill.type}</Badge>
          </Group>
          <Text c="dimmed" fz="sm">
            {skill.description}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  </Stack>
);
