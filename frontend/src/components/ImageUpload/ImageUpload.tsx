import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  ActionIcon,
  Button,
  Card,
  FileInput,
  Group,
  Image,
  Modal,
  Notification,
  Stack,
  Text,
} from "@mantine/core";
import {
  deleteImage,
  fetchImages,
  getOptimizedImageUrl,
  ImageUploadResponse,
  uploadImage,
} from "@/data/images";

interface ImageUploadProps {
  sectionId: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ sectionId }) => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<ImageUploadResponse | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Query for fetching images
  const { data: images = [] } = useQuery({
    queryKey: ["images", id, sectionId],
    queryFn: () => fetchImages(id!, sectionId),
    enabled: !!id && !!sectionId,
  });

  // Mutation for uploading images
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const uploadPromises = files.map((file) => uploadImage(file, id!, sectionId));
      return Promise.all(uploadPromises);
    },
    onSuccess: () => {
      setUploadSuccess("Images uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["images", id, sectionId] });
    },
    onError: (error) => {
      console.error("Error uploading images:", error);
      setUploadSuccess("Failed to upload images.");
    },
  });

  // Mutation for deleting images
  const deleteMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: (_, imageId) => {
      queryClient.setQueryData(
        ["images", id, sectionId],
        (old: ImageUploadResponse[] | undefined) => old?.filter((img) => img._id !== imageId) ?? []
      );
    },
    onError: (error) => {
      console.error("Error deleting image:", error);
    },
  });

  const handleUpload = (files: File[] | null) => {
    if (!files || !id) return;
    uploadMutation.mutate(files);
  };

  return (
    <Stack gap="md">
      <FileInput
        label="Upload Section Images"
        placeholder="Select an image"
        accept="image/*"
        multiple
        onChange={(files) => handleUpload(files as File[])}
      />
      <Button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["images", id, sectionId] })}
        loading={uploadMutation.isPending}
      >
        Refresh Images
      </Button>

      {uploadSuccess && (
        <Notification color={uploadSuccess.startsWith("Failed") ? "red" : "green"}>
          {uploadSuccess}
        </Notification>
      )}

      <Group>
        {images?.map((image) => (
          <Card key={image._id} shadow="sm" padding="sm" radius="md" withBorder>
            <Image
              src={getOptimizedImageUrl(image.imageUrl, {
                width: 100,
                height: 100,
                fit: "cover",
                format: "webp",
              })}
              alt={image.originalName}
              height={100}
              onClick={() => setSelectedImage(image)}
              style={{ cursor: "pointer" }}
            />
            <Group mt="sm">
              <Text size="sm" lineClamp={1} title={image.originalName}>
                {image.originalName}
              </Text>
              <ActionIcon
                color="red"
                onClick={() => deleteMutation.mutate(image._id)}
                loading={deleteMutation.isPending}
                title="Delete"
              >
                <IconTrash />
              </ActionIcon>
            </Group>
          </Card>
        ))}
      </Group>

      <Modal
        opened={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title="Image Preview"
        size="lg"
      >
        {selectedImage && (
          <Image
            src={getOptimizedImageUrl(selectedImage.imageUrl, {
              width: 1200,
              height: 800,
              fit: "contain",
              format: "webp",
            })}
            alt={selectedImage.originalName}
            fit="contain"
          />
        )}
      </Modal>
    </Stack>
  );
};

export default ImageUpload;
