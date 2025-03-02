import { useEffect, useState } from "react";
import { IconCheck, IconEdit, IconTag, IconTrash, IconX } from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Button,
  ColorInput,
  Container,
  Flex,
  Group,
  Modal,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { addTag, deleteTag, fetchTags, Tag, updateTag } from "@/data/tags";

export default function TagManagerPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState<string>("");
  const [newTagColor, setNewTagColor] = useState<string>("#228be6"); // Default color
  const [editTag, setEditTag] = useState<string | null>(null);
  const [editedTag, setEditedTag] = useState<string>("");
  const [editedColor, setEditedColor] = useState<string>("#228be6");
  const [deleteTagName, setDeleteTagName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch tags on mount
  useEffect(() => {
    fetchAllTags();
  }, []);

  const fetchAllTags = async () => {
    try {
      const tags = await fetchTags();
      setTags(tags);
    } catch (error) {
      console.error(error);
    }
  };

  // Add new tag
  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    try {
      setLoading(true);
      const addedTag = await addTag(newTagName.trim(), newTagColor);

      setTags([...tags, addedTag]);
      setNewTagName("");
      setNewTagColor("#228be6");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Edit tag
  const handleEditTag = async () => {
    if (!editTag || !editedTag.trim()) return;
    try {
      setLoading(true);
      const updatedTag = await updateTag(editTag, editedTag.trim(), editedColor);
      setTags(tags.map((tag) => (tag.name === editTag ? updatedTag : tag)));
      setEditTag(null);
      setEditedTag("");
      setEditedColor("#228be6");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete tag
  const handleDeleteTag = async () => {
    if (!deleteTagName) return;
    try {
      setLoading(true);
      await deleteTag(deleteTagName);
      setTags(tags.filter((tag) => tag.name !== deleteTagName));
      setDeleteTagName(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm">
      <h2>Tag Manager</h2>

      {/* Add New Tag */}
      <Group gap="md" mb="lg">
        <TextInput
          placeholder="Enter new tag"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          disabled={loading}
        />
        <ColorInput value={newTagColor} onChange={setNewTagColor} disabled={loading} format="hex" />
        <Button onClick={handleAddTag} disabled={loading}>
          Add Tag
        </Button>
      </Group>

      {/* Tag List (Replaces Table) */}
      <Stack gap="sm">
        {tags.map(({ name, color }) => (
          <Paper
            key={name}
            shadow="xs"
            radius="md"
            p="sm"
            withBorder
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Flex align="center" gap="sm">
              <IconTag size={20} color={color} />
              <Badge color={color}>{name}</Badge>
            </Flex>

            <Group gap="xs">
              <ActionIcon
                color="blue"
                onClick={() => {
                  setEditTag(name);
                  setEditedTag(name);
                  setEditedColor(color);
                }}
              >
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon color="red" onClick={() => setDeleteTagName(name)}>
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Paper>
        ))}
      </Stack>

      {/* Edit Tag Modal */}
      <Modal opened={!!editTag} onClose={() => setEditTag(null)} title="Edit Tag">
        <Stack>
          <TextInput value={editedTag} onChange={(e) => setEditedTag(e.target.value)} />
          <ColorInput value={editedColor} onChange={setEditedColor} format="hex" />
          <Group justify="right">
            <Button color="gray" onClick={() => setEditTag(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditTag} leftSection={<IconCheck size={16} />}>
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Tag Confirmation Modal */}
      <Modal opened={!!deleteTagName} onClose={() => setDeleteTagName(null)} title="Confirm Delete">
        <p>Are you sure you want to delete the tag "{deleteTagName}"?</p>
        <Group justify="right">
          <Button color="gray" onClick={() => setDeleteTagName(null)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteTag} leftSection={<IconX size={16} />}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Container>
  );
}
