import { Link } from "react-router-dom";
import { Badge, Button, Card, Grid, Image, List, Title } from "@mantine/core";
import { builds } from "@/data/builds";

export const BuildList: React.FC = () => {
  return (
    <Grid mt={60}>
      {builds.map((build) => (
        <Grid.Col key={build.id} span={{ xs: 12, sm: 6, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Link to={`/build/${build.id}`}>
              <Image
                src={build.thumbnail}
                alt={build.name}
                height={200}
                mb="sm"
                radius="md"
                fit="cover"
              />
            </Link>
            <Title order={3} mb="xs">
              {build.name}
            </Title>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
              {build.tags.map((tag) => (
                <Badge key={tag.title} color={tag.color} variant="light" radius="xl">
                  {tag.title}
                </Badge>
              ))}
            </div>
            <List mb="sm">
              {build.weapons.map((weapon) => (
                <List.Item key={weapon}>{weapon}</List.Item>
              ))}
            </List>
            <Button
              variant="light"
              color="blue"
              fullWidth
              component={Link}
              to={`/build/${build.id}`}
            >
              View Build
            </Button>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
