import { Badge } from "@mantine/core";
import { ITag } from "@/data/builds";

interface BuildTagsProps {
  tags: ITag[];
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
        <Badge key={tag.title} color={tag.color} variant="light" radius="xl">
          {tag.title}
        </Badge>
      ))}
    </div>
  );
};
