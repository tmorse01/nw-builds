import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge, Group, Input, Loader, Text } from "@mantine/core";
import { fetchTags } from "@/data/tags";

interface TagsFilterProps {
  onFilterChange?: (tags: string[]) => void;
}

export function TagsFilter({ onFilterChange }: TagsFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

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
        {isLoading && <Loader size="sm" mt="xs" />}
        {isError && <Text color="red">Failed to load tags</Text>}

        {tags && (
          <Group gap="xs" mt="xs">
            {tags.map(({ name, color }) => (
              <Badge
                key={name}
                color={selectedTags.includes(name) ? color : "gray"}
                variant={selectedTags.includes(name) ? "filled" : "outline"}
                onClick={() => handleTagClick(name)}
                style={{ cursor: "pointer" }}
              >
                {name}
              </Badge>
            ))}
            {selectedTags.length > 0 && (
              <Badge
                color="red"
                variant="filled"
                onClick={handleClear}
                style={{ cursor: "pointer" }}
              >
                Clear All
              </Badge>
            )}
          </Group>
        )}
      </Input.Wrapper>
    </div>
  );
}
