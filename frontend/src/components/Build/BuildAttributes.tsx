import { IconBrain, IconEye, IconRun, IconShield, IconSword } from "@tabler/icons-react";
import { Card, Divider, Group, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core";

interface BuildAttributesProps {
  attributes: {
    strength: number;
    dexterity: number;
    intelligence: number;
    focus: number;
    constitution: number;
  };
}

export const BuildAttributes: React.FC<BuildAttributesProps> = ({ attributes }) => {
  const theme = useMantineTheme();

  // Dynamically map attributes to theme-based colors
  const attributeIcons = {
    strength: <IconSword size={20} color={theme.colors.red[6]} />,
    dexterity: <IconRun size={20} color={theme.colors.green[6]} />,
    intelligence: <IconBrain size={20} color={theme.colors.blue[6]} />,
    focus: <IconEye size={20} color={theme.colors.violet[6]} />,
    constitution: <IconShield size={20} color={theme.colors.orange[6]} />,
  };

  return (
    <>
      <Text fw={600} fz="lg" mb="sm" mt="lg">
        Attributes
      </Text>
      <Card withBorder shadow="sm" radius="md" mt="lg">
        <Stack gap="xs">
          {Object.entries(attributes).map(([attr, value]) => (
            <Group key={attr} align="apart">
              <Group gap="xs">
                <ThemeIcon radius="xl" size="md" variant="light">
                  {attributeIcons[attr as keyof typeof attributeIcons]}
                </ThemeIcon>
                <Text>{attr.charAt(0).toUpperCase() + attr.slice(1)}</Text>
              </Group>
              <Text fw={700} fz="md" color="dimmed">
                {value}
              </Text>
            </Group>
          ))}
        </Stack>
        <Divider mt="sm" />
      </Card>
    </>
  );
};
