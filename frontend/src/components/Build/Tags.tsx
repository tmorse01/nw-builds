import { Badge } from "@mantine/core";
import { Tag } from "@/data/types";

interface BuildTagsProps {
  tags: Tag[];
}

export const BuildTags: React.FC<BuildTagsProps> = ({ tags }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        alignContent: "center",
      }}
    >
      {tags.map((tag) => (
        <Badge key={tag.name} color={tag.color} variant="light" radius="xl">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};
