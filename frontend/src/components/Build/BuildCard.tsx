import { Link } from "react-router-dom";
import { Badge, Button, Card, Image, List, Title } from "@mantine/core";
import { getTagColor, Tag } from "@/data/types";

interface BuildCardProps {
  id: string;
  name: string;
  thumbnail: string;
  tags: string[];
  weapons: string[];
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const BuildCard: React.FC<BuildCardProps> = ({
  id,
  name,
  thumbnail,
  tags,
  weapons,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Link to={`/build/${id}`}>
        <Image
          src={thumbnail}
          alt={name}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          height={200}
          mb="sm"
          radius="md"
          fit="cover"
        />
      </Link>
      <Title order={3} mb="xs">
        {name}
      </Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {tags.map((tag) => (
          <Badge key={tag} color={getTagColor(tag as Tag)} variant="light" radius="xl">
            {tag}
          </Badge>
        ))}
      </div>
      <List mb="sm">
        {weapons.map((weapon) => (
          <List.Item key={weapon}>{weapon}</List.Item>
        ))}
      </List>
      <Button variant="light" color="blue" fullWidth component={Link} to={`/build/${id}`} mb="xs">
        View Build
      </Button>
      {showActions && (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="light" color="yellow" fullWidth onClick={onEdit}>
            Edit
          </Button>
          <Button variant="light" color="red" fullWidth onClick={onDelete}>
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};
