import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ActionIcon, Box, Image, Modal, SimpleGrid, Stack, Text } from "@mantine/core";
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
  const { id: buildId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState<ImageUploadResponse | null>(null);

  // Fetch images from Cloudinary
  const { data: images = [] } = useQuery({
    queryKey: ["images", buildId, sectionId],
    queryFn: () => fetchImages(buildId!, sectionId),
    enabled: !!buildId && !!sectionId,
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const uploadPromises = files.map((file) => uploadImage(file, buildId!, sectionId));
      return Promise.all(uploadPromises);
    },
    onSuccess: () => {
      showNotification({
        title: "Upload Successful",
        message: "Your images have been uploaded.",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["images", buildId, sectionId] });
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
        ["images", buildId, sectionId],
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
                height={200}
                radius="md"
                style={{ cursor: "pointer" }}
                onClick={() => setPreviewImage(image)}
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

      {/* Full-size image preview modal */}
      <Modal
        opened={!!previewImage}
        onClose={() => setPreviewImage(null)}
        title={previewImage?.originalName || "Image Preview"}
        size="xl"
      >
        {previewImage && (
          <Image
            src={previewImage.cloudinaryUrl}
            alt={previewImage.originalName}
            fit="contain"
            style={{ maxHeight: "80vh" }}
          />
        )}
      </Modal>
    </Stack>
  );
};

export default SectionImageUpload;
