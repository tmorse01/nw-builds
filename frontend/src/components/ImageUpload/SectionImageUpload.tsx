import { IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ActionIcon, Box, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import {
  deleteImage,
  fetchImages,
  getOptimizedImageUrl,
  ImageUploadResponse,
  uploadImage,
} from "@/data/images";

import "@mantine/dropzone/styles.css";

interface SectionImageUpload {
  sectionId: string;
}

const SectionImageUpload: React.FC<SectionImageUpload> = ({ sectionId }) => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  // Fetch images from Cloudinary
  const { data: images = [] } = useQuery({
    queryKey: ["images", id, sectionId],
    queryFn: () => fetchImages(id!, sectionId),
    enabled: !!id && !!sectionId,
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const uploadPromises = files.map((file) => uploadImage(file, id!, sectionId));
      return Promise.all(uploadPromises);
    },
    onSuccess: () => {
      showNotification({
        title: "Upload Successful",
        message: "Your images have been uploaded.",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["images", id, sectionId] });
    },
    onError: () => {
      showNotification({
        title: "Upload Failed",
        message: "There was an issue uploading your images.",
        color: "red",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (image: ImageUploadResponse) => deleteImage(image.id),
    onSuccess: (_, deletedImage) => {
      queryClient.setQueryData(
        ["images", id, sectionId],
        (old: ImageUploadResponse[] | undefined) =>
          old?.filter((img) => img.id !== deletedImage.id) ?? []
      );
    },
    onError: () => {
      showNotification({
        title: "Delete Failed",
        message: "Could not delete image.",
        color: "red",
      });
    },
  });

  // Handle file selection & upload
  const handleDrop = (files: FileWithPath[]) => {
    uploadMutation.mutate(files);
  };

  return (
    <Stack gap="sm">
      {/* Drag & Drop Upload */}
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={handleDrop} multiple>
        <Text ta="center">Upload images here or click to select files</Text>
      </Dropzone>

      {images.length > 0 && (
        <SimpleGrid cols={{ base: 2, sm: 4 }} mt="xl">
          {images.map((image) => (
            <Box key={image.id} pos="relative">
              <Image
                src={getOptimizedImageUrl(image.cloudinaryUrl, {
                  quality: 90,
                })}
                alt={image.originalName}
                radius="md"
              />
              {/* Delete Icon in Top-Right Corner */}
              <ActionIcon
                size="sm"
                radius="xl"
                variant="filled"
                color="red"
                pos="absolute"
                top={5}
                right={5}
                onClick={() => deleteMutation.mutate(image)}
                loading={deleteMutation.isPending}
                title="Delete"
              >
                <IconX size={16} />
              </ActionIcon>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default SectionImageUpload;
