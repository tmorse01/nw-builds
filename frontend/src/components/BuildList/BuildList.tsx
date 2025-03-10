import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Loader, Text, Title } from "@mantine/core";
import { fetchBuildList } from "@/data/builds";
import { Build } from "@/data/types";
import { useSEO } from "@/hooks/useSEO";
import { BuildCard } from "../Build/BuildCard";
import { SEOHead } from "../SEO/SEOHead";

interface BuildListProps {
  tags?: string[] | null;
}

export const BuildList: React.FC<BuildListProps> = ({ tags }) => {
  const [filteredBuilds, setFilteredBuilds] = useState<Build[]>([]);
  const { seoData, generateSEOFromBuilds } = useSEO();

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
      const filtered =
        tags && tags.length > 0
          ? builds.filter((build) =>
              tags.every((tag) => build.tags.some((buildTag) => buildTag.name === tag))
            )
          : builds;

      setFilteredBuilds(filtered);
      // Generate SEO data based on the filtered builds
      generateSEOFromBuilds(filtered, tags);
    }
  }, [builds, tags, generateSEOFromBuilds]);

  if (isLoading) return <Loader size="sm" mt="lg" />;
  if (isError || !filteredBuilds.length)
    return (
      <Text c="red" mt="lg">
        No builds found.
      </Text>
    );

  return (
    <>
      <SEOHead title={seoData.title} description={seoData.description} jsonLd={seoData.jsonLd} />
      <Box mb={30}>
        <Title order={1}>{tags?.length ? `${tags.join(", ")} Builds` : "All Builds"}</Title>
        <Text c="dimmed" mt={5}>
          Showing {filteredBuilds.length} build{filteredBuilds.length !== 1 ? "s" : ""}
        </Text>
      </Box>

      <Grid mt={20}>
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
    </>
  );
};
