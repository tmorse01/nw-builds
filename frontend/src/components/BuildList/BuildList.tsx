import { Grid } from "@mantine/core";
import { getBuildListByTag } from "@/data/builds";
import { BuildCard } from "../Build/BuildCard";

interface BuildListProps {
  tags?: string[] | null | undefined;
}

export const BuildList: React.FC<BuildListProps> = ({ tags }) => {
  const builds = getBuildListByTag(tags ?? undefined);
  return (
    <Grid mt={60}>
      {builds.map((build) => (
        <Grid.Col key={build._id} span={{ xs: 12, sm: 6, md: 4 }}>
          <BuildCard
            id={build._id}
            name={build.name}
            thumbnail={build.thumbnail}
            tags={build.tags}
            weapons={build.weapons}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};
