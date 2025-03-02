import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Group,
  MultiSelect,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import SectionEditor from "@/components/BuildEditor/SectionEditor";
import { createBuild, deleteBuild, updateBuild } from "@/data/builds";
import { Build, Section } from "@/data/types";
import { DeleteButton } from "../Common/DeleteButton";
import ThumbnailUpload from "../ImageUpload/ThumbnailUpload";

interface BuildEditorProps {
  build: Build;
  onSave: (build: Build) => void;
  onCancel: () => void;
}

const BuildEditor: React.FC<BuildEditorProps> = ({ build, onSave }) => {
  const [sections, setSections] = useState([...(build?.sections ?? [])]);
  const form = useForm({ initialValues: build });
  const { id } = useParams();
  const isNewBuild = id === "new";

  const handleSectionChange = (index: number, key: string, value: string) => {
    const keyName = key as "title" | "content";
    const updatedSections = [...sections];
    updatedSections[index][keyName] = value;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { _id: "", title: "", content: "" } as Section]);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = (values: any) => {
    const buildData = { ...values, sections };
    if (isNewBuild) {
      // Create new build
      createBuild(buildData).then((data) => {
        notifications.show({
          title: "Build Created",
          message: "Your build has been create successfully.",
        });
        onSave(data);
      });
    } else {
      // Update existing build
      updateBuild(build._id, buildData).then((data) => {
        notifications.show({
          title: "Build Updated",
          message: "Your build has been updated successfully.",
        });
        onSave(data);
      });
    }
  };

  const handleDeleteBuild = () => {
    if (build?._id) {
      deleteBuild(build._id)
        .then(() => {
          notifications.show({
            title: "Build Deleted",
            message: "Your build has been deleted successfully.",
          });
        })
        .catch((error) => {
          notifications.show({
            title: "Build Delete Failed",
            message: error.message,
            color: "red",
          });
        });
    }
  };

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Title order={3}>Build Details</Title>
          <Group>
            <TextInput
              label="Build Name"
              placeholder="Unique build name"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Created By"
              placeholder="Build creator"
              required
              {...form.getInputProps("createdBy")}
            />
            <NumberInput
              label="Season"
              placeholder="Build created for season"
              required
              {...form.getInputProps("season")}
            />
            <ThumbnailUpload buildId={build._id} />
          </Group>
          <MultiSelect
            label="Weapons"
            required
            {...form.getInputProps("weapons")}
            data={["Great Axe", "Warhammer", "Bow", "Rapier", "Spear"]}
          />
          <Group>
            {["strength", "dexterity", "intelligence", "focus", "constitution"].map((attr) => (
              <NumberInput
                key={attr}
                style={{ width: "100px" }}
                label={attr.charAt(0).toUpperCase() + attr.slice(1)}
                {...form.getInputProps(`attributes.${attr}`)}
                required
              />
            ))}
          </Group>

          <Textarea
            label="Playstyle"
            placeholder="Describe the builds playstyle"
            required
            {...form.getInputProps("playstyle")}
          />

          <Title order={3}>Sections</Title>
          {sections.map((section, index) => (
            <SectionEditor
              key={index}
              section={section}
              onChange={(key: string, value: string) => handleSectionChange(index, key, value)}
              onRemove={() => handleRemoveSection(index)}
            />
          ))}
          <Group justify="center">
            <DeleteButton onDelete={handleDeleteBuild} />
            <Button onClick={handleAddSection} variant="light">
              Add Section
            </Button>
            <Button type="submit">Save Build</Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
};

export default BuildEditor;
