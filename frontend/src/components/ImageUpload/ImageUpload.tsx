import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
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
import { deleteImage, fetchImagesBySection, uploadImage } from "@/data/api";
import { ImageType } from "@/data/types";

const ImageUpload = ({ sectionId }: { sectionId: string }) => {
  const { id } = useParams();
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Fetch images for the section
  const fetchImages = async () => {
    if (!id) {
      return;
    }
    try {
      const response = await fetchImagesBySection(id, sectionId);
      setImages(response);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleUpload = async (files: File[] | null) => {
    if (!files || !id) {
      return;
    }

    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const reader = new FileReader();
        return new Promise<void>((resolve, reject) => {
          reader.onloadend = async () => {
            const base64String = reader.result?.toString().split(",")[1];
            if (base64String) {
              try {
                await uploadImage(id, sectionId, base64String);
                resolve();
              } catch (error) {
                reject(error);
              }
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.readAsDataURL(file);
        });
      });

      await Promise.all(uploadPromises);
      setUploadSuccess("Images uploaded successfully!");
      await fetchImages();
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadSuccess("Failed to upload images.");
    } finally {
      setIsUploading(false);
    }
  };

  // Delete image
  const handleDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId);
      setImages((prev) => prev.filter((img) => img._id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [id, sectionId]);

  return (
    <Stack gap="md">
      <FileInput
        label="Upload Section Images"
        placeholder="Select an image"
        accept="image/*"
        multiple
        onChange={(files) => handleUpload(files as File[])}
      />
      <Button onClick={fetchImages} loading={isUploading}>
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
              src={`data:image/png;base64,${image.data}`}
              alt="Uploaded"
              height={100}
              onClick={() => setSelectedImage(image)}
              style={{ cursor: "pointer" }}
            />
            <Group mt="sm">
              <Text size="sm">Image</Text>
              <ActionIcon color="red" onClick={() => handleDelete(image._id)} title="Delete">
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
          <Image src={`data:image/png;base64,${selectedImage.data}`} alt="Preview" fit="contain" />
        )}
      </Modal>
    </Stack>
  );
};

export default ImageUpload;
