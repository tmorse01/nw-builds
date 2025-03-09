import React from "react";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { SectionImage } from "@/data/types";

interface BuildSectionImageViewerProps {
  images: SectionImage[];
  onImageClick: (src: string) => void;
}

export const BuildSectionImageViewer: React.FC<BuildSectionImageViewerProps> = ({
  images,
  onImageClick,
}) => {
  if (images.length === 0) {
    return null;
  }
  console.log("hello world");
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
