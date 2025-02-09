import { Badge } from "@mantine/core";
import { getTagColor, Tag } from "@/data/types";

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
        <Badge key={tag} color={getTagColor(tag)} variant="light" radius="xl">
          {tag}
        </Badge>
      ))}
    </div>
  );
};
