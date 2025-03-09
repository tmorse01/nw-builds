import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Flex, Group, NumberInput, Text, TextInput } from "@mantine/core";

export interface Perk {
  name: string;
  count: number;
}

interface PerkEditorProps {
  value?: Perk[];
  onChange?: (perks: Perk[]) => void;
  readOnly?: boolean;
}

export const PerkEditor: React.FC<PerkEditorProps> = ({
  value = [],
  onChange,
  readOnly = false,
}) => {
  const [perks, setPerks] = useState<Perk[]>(value);
  const [newPerkName, setNewPerkName] = useState("");
  const [newPerkCount, setNewPerkCount] = useState<number | "">(1);

  const handleAddPerk = () => {
    if (newPerkName.trim() === "" || !newPerkCount) return;

    const newPerks = [...perks, { name: newPerkName.trim(), count: Number(newPerkCount) }];

    setPerks(newPerks);
    onChange?.(newPerks);

    // Clear inputs
    setNewPerkName("");
    setNewPerkCount(1);
  };

  const handleRemovePerk = (index: number) => {
    const newPerks = perks.filter((_, i) => i !== index);
    setPerks(newPerks);
    onChange?.(newPerks);
  };

  return (
    <>
      {!readOnly && (
        <Group align="end">
          <TextInput
            label="Perk Name"
            placeholder="e.g. Refreshing"
            value={newPerkName}
            onChange={(e) => setNewPerkName(e.target.value)}
            style={{ width: 300 }}
          />
          <NumberInput
            label="Count"
            placeholder="How many?"
            value={newPerkCount}
            onChange={(value) => setNewPerkCount(Number(value))}
            min={1}
            max={10}
            style={{ width: 100 }}
          />
          <ActionIcon
            color="blue"
            variant="filled"
            onClick={handleAddPerk}
            disabled={!newPerkName.trim() || !newPerkCount}
            size="lg"
          >
            <IconPlus size={16} />
          </ActionIcon>
        </Group>
      )}
      <Flex gap="xs" wrap="wrap" mb={readOnly ? 0 : 10} style={{ flex: 1 }}>
        {perks.map((perk, index) => (
          <Group
            key={index}
            gap={5}
            style={{ border: "1px solid #444", borderRadius: "4px", padding: "3px 8px" }}
          >
            <Text c="yellow" fw={700} size="sm" style={{ display: "inline" }}>
              {perk.count}x
            </Text>
            <Text size="sm" style={{ display: "inline" }}>
              {perk.name}
            </Text>
            {!readOnly && (
              <ActionIcon
                size="xs"
                color="red"
                variant="transparent"
                onClick={() => handleRemovePerk(index)}
              >
                <IconTrash size={12} />
              </ActionIcon>
            )}
          </Group>
        ))}
        {perks.length === 0 && readOnly && (
          <Text color="dimmed" size="sm">
            No priority perks specified
          </Text>
        )}
      </Flex>
    </>
  );
};
