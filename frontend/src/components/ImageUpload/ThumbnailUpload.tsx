import { useState } from "react";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

type ThumbnailUploadProps = {
  onChange?: (file: File | null) => void;
};

export default function ThumbnailUpload({ onChange }: ThumbnailUploadProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
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
        <div style={{ position: "relative", width: 120, height: 120 }}>
          <Image src={thumbnail} alt="Thumbnail preview" width={120} height={120} radius="md" />
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
