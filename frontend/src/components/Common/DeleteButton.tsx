import { useState } from "react";
import { Button, Group, Modal, Text } from "@mantine/core";

interface DeleteButtonProps {
  onDelete: () => void;
  label?: string;
  confirmationMessage?: string;
}

export function DeleteButton({
  onDelete,
  label = "Delete",
  confirmationMessage = "Are you sure you want to delete this item?",
}: DeleteButtonProps) {
  const [opened, setOpened] = useState(false);

  const handleDelete = () => {
    onDelete();
    setOpened(false);
  };

  return (
    <>
      <Button color="red" onClick={() => setOpened(true)}>
        {label}
      </Button>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion" centered>
        <Text>{confirmationMessage}</Text>
        <Group pt="lg">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}
