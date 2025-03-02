import { useState } from "react";
import { Button, Modal, Text } from "@mantine/core";

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
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="default" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}
