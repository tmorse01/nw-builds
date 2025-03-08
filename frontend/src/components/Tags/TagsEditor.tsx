import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge, Group, Input, Loader, Text } from "@mantine/core";
import { fetchTags, Tag } from "@/data/tags";

interface TagEditorProps {
  onChange?: (tags: Tag[]) => void;
  value?: Tag[];
}

export function TagEditor({ onChange, value }: TagEditorProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(value ?? []);

  // Sync with external value prop
  useEffect(() => {
    if (value) {
      setSelectedTags(value);
    }
  }, [value]);

  // Fetch available tags from the database
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prev) => {
      const isSelected = prev.some((t) => t.name === tag.name);
      const updatedTags = isSelected ? prev.filter((t) => t.name !== tag.name) : [...prev, tag];

      onChange?.(updatedTags);
      return updatedTags;
    });
  };

  const handleClear = () => {
    setSelectedTags([]);
    onChange?.([]);
  };

  return (
    <div>
      <Input.Wrapper label="Manage Tags" description="Select existing tags">
        {isLoading && <Loader size="sm" mt="xs" />}
        {isError && <Text color="red">Failed to load tags</Text>}

        {tags && (
          <Group gap="xs" mt="xs">
            {tags.map((tag) => (
              <Badge
                key={tag.name}
                color={selectedTags.some((t) => t.name === tag.name) ? tag.color : "gray"}
                variant={selectedTags.some((t) => t.name === tag.name) ? "filled" : "outline"}
                onClick={() => handleTagClick(tag)}
                style={{ cursor: "pointer" }}
              >
                {tag.name}
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
