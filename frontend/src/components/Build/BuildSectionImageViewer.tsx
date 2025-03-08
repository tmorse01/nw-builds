import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "@mantine/carousel";
import { Center, Image, Loader, Text } from "@mantine/core";
import { fetchImages } from "../../data/images";

interface BuildSectionImageViewerProps {
  sectionId?: string;
  buildId: string;
  onImageClick: (src: string) => void;
}

export const BuildSectionImageViewer: React.FC<BuildSectionImageViewerProps> = ({
  sectionId,
  buildId,
  onImageClick,
}) => {
  // Using TanStack Query for data fetching
  // TODO: Later optimize to fetch all the images for a build at once
  const {
    data: images = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sectionImages", buildId, sectionId],
    queryFn: () => fetchImages(buildId, sectionId),
    enabled: !!buildId && !!sectionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  if (isLoading) {
    return (
      <Center my="xl">
        <Loader size="md" />
      </Center>
    );
  }

  if (error) {
    return <Text my="md">Failed to load images. Please try again later.</Text>;
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <Carousel
        withIndicators
        loop
        align="start"
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
      >
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            <Image
              radius="md"
              src={image.cloudinaryUrl}
              alt={image.originalName}
              onClick={() => onImageClick(image.cloudinaryUrl)}
              style={{ cursor: "pointer" }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};
