import { useEffect, useState } from "react";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { fetchImages, uploadImage } from "@/data/images";

type ThumbnailUploadProps = {
  buildId: string;
  onChange?: (file: File | null) => void;
};

export default function ThumbnailUpload({ buildId, onChange }: ThumbnailUploadProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const loadThumbnail = async () => {
      try {
        const images = await fetchImages(buildId, "thumbnail");
        if (images.length > 0) {
          setThumbnail(images[0].cloudinaryUrl);
        }
      } catch (error) {
        console.error("Error fetching thumbnail:", error);
      }
    };

    loadThumbnail();
  }, [buildId]);

  const handleThumbnailUpload = async (file: File | null): Promise<void> => {
    if (!file) return;
    try {
      if (!buildId) {
        throw new Error("Build ID is required to upload thumbnail.");
      }
      await uploadImage(file, buildId, "thumbnail");
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      throw error;
    }
  };

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
        handleThumbnailUpload(file).catch((error) => {
          showNotification({
            title: "Upload Thumbnail Failed",
            message: error.message,
            color: "red",
          });
        });
        onChange && onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setThumbnail(null);
    onChange && onChange(null);
  };

  return (
    <Stack align="center" gap="md">
      {thumbnail ? (
        <div style={{ position: "relative", width: 200, height: 120 }}>
          <Image src={thumbnail} alt="Thumbnail preview" width={200} height={120} radius="md" />
          <Button
            size="xs"
            color="red"
            onClick={removeImage}
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              borderRadius: "50%",
              width: 24,
              height: 24,
              minWidth: 24,
              padding: 0,
            }}
          >
            <IconTrash size={16} />
          </Button>
        </div>
      ) : (
        <Dropzone onDrop={handleDrop} accept={IMAGE_MIME_TYPE} maxFiles={1} multiple={false}>
          <Group justify="center" gap="xs">
            <IconPhoto size={24} />
            <Text size="sm">Upload Thumbnail</Text>
          </Group>
        </Dropzone>
      )}
    </Stack>
  );
}
