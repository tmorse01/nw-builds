import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Loader, Text } from "@mantine/core";
import { fetchBuildList } from "@/data/builds";
import { Build } from "@/data/types";
import { BuildCard } from "../Build/BuildCard";

interface BuildListProps {
  tags?: string[] | null;
}

export const BuildList: React.FC<BuildListProps> = ({ tags }) => {
  const [filteredBuilds, setFilteredBuilds] = useState<Build[]>([]);

  const {
    data: builds,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["builds"],
    queryFn: async () => {
      const response = await fetchBuildList();
      return response.builds;
    },
  });

  useEffect(() => {
    if (builds) {
      setFilteredBuilds(
        tags && tags.length > 0
          ? builds.filter((build) =>
              tags.every((tag) => build.tags.some((buildTag) => buildTag.name === tag))
            )
          : builds
      );
    }
  }, [builds, tags]);

  if (isLoading) return <Loader size="sm" mt="lg" />;
  if (isError || !filteredBuilds.length)
    return (
      <Text color="red" mt="lg">
        No builds found.
      </Text>
    );

  return (
    <Grid mt={60}>
      {filteredBuilds.map((build) => (
        <Grid.Col key={build._id} span={{ xs: 12, sm: 6, md: 4 }}>
          <BuildCard
            id={build._id}
            name={build.name}
            link={`/build/${build._id}`}
            tags={build.tags}
            weapons={build.weapons}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};
