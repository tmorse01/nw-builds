import {
  IconAxe,
  IconBow,
  IconFlame,
  IconGalaxy,
  IconHammer,
  IconHeart,
  IconSnowflake,
  IconSword,
  IconTrowel,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Loader,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { fetchBuildThumbnail } from "@/data/builds";
import { Tag } from "@/data/types";

interface BuildCardProps {
  id: string;
  name: string;
  link: string;
  tags: Tag[];
  weapons: string[];
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const BuildCard: React.FC<BuildCardProps> = ({
  id,
  name,
  link,
  tags,
  weapons,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  // Fetch the thumbnail using React Query
  const { data: thumbnail, isLoading } = useQuery({
    queryKey: ["buildThumbnail", id],
    queryFn: () => fetchBuildThumbnail(id),
  });

  // Enhanced weapon icon mapping with more weapon types
  const getWeaponIcon = (weapon: string) => {
    switch (weapon.toLowerCase()) {
      case "sword and shield":
        return <IconSword size={20} stroke={1.5} />;
      case "great axe":
        return <IconAxe size={20} stroke={1.5} />;
      case "bow":
        return <IconBow size={20} stroke={1.5} />;
      case "rapier":
        return <IconSword size={20} stroke={1.5} />;
      case "warhammer":
        return <IconHammer size={20} stroke={1.5} />;
      case "spear":
        return <IconTrowel size={20} stroke={1.5} transform="rotate(135deg)" />;
      case "hatchet":
        return <IconAxe size={20} stroke={1.5} />;
      case "fire staff":
        return <IconFlame size={20} stroke={1.5} />;
      case "life staff":
        return <IconHeart size={20} stroke={1.5} />;
      case "ice gauntlet":
        return <IconSnowflake size={20} stroke={1.5} />;
      case "void gauntlet":
        return <IconGalaxy size={20} stroke={1.5} />;
      case "greatsword":
        return <IconSword size={20} stroke={1.5} />;
      default:
        return null;
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Link to={link}>
        {isLoading ? (
          <Loader size="sm" mt="lg" />
        ) : (
          <Image
            src={thumbnail}
            alt={name}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            height={200}
            mb="sm"
            radius="md"
            fit="cover"
          />
        )}
      </Link>
      <Title order={3} mb="xs">
        {name}
      </Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {tags.map((tag) => (
          <Badge key={tag.name} color={tag.color} variant="light" radius="xl">
            {tag.name}
          </Badge>
        ))}
      </div>

      {/* Minimalist weapon display with stat bars */}
      <Group mb="md" gap="xs">
        {weapons.map((weapon, index) => (
          <Box key={weapon} w="100%">
            <Tooltip label={`${weapon} (${index === 0 ? "Primary" : "Secondary"})`}>
              <Group gap="xs" wrap="nowrap" align="center" mb={6}>
                <ThemeIcon
                  size={42}
                  radius="md"
                  variant="light"
                  color={index === 0 ? "blue" : "grape"}
                >
                  {getWeaponIcon(weapon) || weapon.charAt(0).toUpperCase()}
                </ThemeIcon>
                <Box w="100%">
                  <Text size="sm" fw={600} mb={2} style={{ textTransform: "capitalize" }}>
                    {weapon}
                  </Text>
                </Box>
              </Group>
            </Tooltip>
          </Box>
        ))}
      </Group>

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
