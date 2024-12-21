import { useState } from "react";
import { Badge, Group, Input } from "@mantine/core";

const tagsData = [
  "Tank",
  "Healer",
  "DPS",
  "PvP",
  "PvE",
  "Solo",
  "Group",
  "Mage",
  "Melee",
  "Ranged",
];

interface TagsFilterProps {
  onFilterChange?: (tags: string[]) => void;
}

export function TagsFilter({ onFilterChange }: TagsFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      const isSelected = prev.includes(tag);
      const updatedTags = isSelected ? prev.filter((t) => t !== tag) : [...prev, tag];

      if (onFilterChange) {
        onFilterChange(updatedTags);
      }
      return updatedTags;
    });
  };

  const handleClear = () => {
    setSelectedTags([]);
    if (onFilterChange) {
      onFilterChange([]);
    }
  };

  return (
    <div>
      <Input.Wrapper label="Filter by Tags" description="Select tags to filter builds">
        <Group gap="xs" mt="xs">
          {tagsData.map((tag) => (
            <Badge
              key={tag}
              color={selectedTags.includes(tag) ? "blue" : "gray"}
              variant={selectedTags.includes(tag) ? "filled" : "outline"}
              onClick={() => handleTagClick(tag)}
              style={{ cursor: "pointer" }}
            >
              {tag}
            </Badge>
          ))}
          {selectedTags.length > 0 && (
            <Badge color="red" variant="filled" onClick={handleClear} style={{ cursor: "pointer" }}>
              Clear All
            </Badge>
          )}
        </Group>
      </Input.Wrapper>
    </div>
  );
}
