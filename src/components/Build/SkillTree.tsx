import { Badge, Card, Group, SimpleGrid, Stack, Text } from "@mantine/core";

const skills = [
  { name: "Shield Bash", type: "Active", description: "Stuns enemies for 2 seconds." },
  { name: "Defender Stance", type: "Passive", description: "Reduces incoming damage by 15%." },
  { name: "Leaping Strike", type: "Active", description: "Deals 150% weapon damage." },
];

export const SkillTree = () => (
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
