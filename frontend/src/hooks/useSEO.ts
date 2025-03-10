import { useState } from "react";
import { Build } from "@/data/types";

interface UseSEOOptions {
  baseTitle?: string;
  baseDescription?: string;
}

interface SEOData {
  title: string;
  description: string;
  jsonLd?: Record<string, any>;
}

export const useSEO = (options: UseSEOOptions = {}) => {
  const {
    baseTitle = "New World Builds",
    baseDescription = "Browse the best New World builds for all weapon combinations and playstyles",
  } = options;

  const [seoData, setSEOData] = useState<SEOData>({
    title: baseTitle,
    description: baseDescription,
  });

  const generateSEOFromBuilds = (
    builds: Build[],
    selectedTags?: string[] | null,
    pageName?: string
  ) => {
    if (!builds || !builds.length) {
      const title = selectedTags?.length
        ? `${selectedTags.join(", ")} Builds - ${baseTitle}`
        : `All Builds - ${baseTitle}`;

      setSEOData({
        title,
        description: "No builds found for the selected criteria",
      });
      return;
    }

    // Collect all weapons from filtered builds
    const allWeapons = builds.flatMap((build) =>
      build.weapons.map((weapon) => (typeof weapon === "string" ? weapon : weapon))
    );

    // Count occurrences of each weapon
    const weaponCounts = allWeapons.reduce((acc: Record<string, number>, weapon) => {
      acc[weapon] = (acc[weapon] || 0) + 1;
      return acc;
    }, {});

    // Get top 3 most common weapons
    const topWeapons = Object.entries(weaponCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([weapon]) => weapon);

    // Collect all tags from filtered builds (apart from selected tags)
    const allTags = builds
      .flatMap((build) => build.tags.map((tag) => tag.name))
      .filter((tag) => !selectedTags?.includes(tag));

    // Count occurrences of each tag
    const tagCounts = allTags.reduce((acc: Record<string, number>, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    // Get top 3 most common tags
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);

    // Create title and description
    const title = selectedTags?.length
      ? `${selectedTags.join(", ")} Builds - ${baseTitle}`
      : `${pageName || "All Builds"} - ${baseTitle}`;

    // Create description using the data
    let description = selectedTags?.length
      ? `Browse ${builds.length} New World builds featuring ${selectedTags.join(", ")}`
      : `Browse ${builds.length} New World builds for all playstyles`;

    if (topWeapons.length) {
      description += `. Popular weapons include ${topWeapons.join(", ")}`;
    }

    if (topTags.length) {
      description += `. Common tags: ${topTags.join(", ")}`;
    }

    // Generate structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: builds.map((build, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          name: build.name,
          description: `New World build featuring ${build.weapons
            .map((w) => (typeof w === "string" ? w : w))
            .join(" and ")}`,
          url: `${window.location.origin}/build/${build._id}`,
        },
      })),
    };

    setSEOData({
      title,
      description,
      jsonLd,
    });
  };

  return {
    seoData,
    generateSEOFromBuilds,
  };
};
