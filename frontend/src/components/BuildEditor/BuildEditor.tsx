import { useState } from "react";
import ObjectId from "bson-objectid";
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
import { weapons } from "@/data/constants";
import { Build, Section, Tag } from "@/data/types";
import { DeleteButton } from "../Common/DeleteButton";
import ThumbnailUpload from "../ImageUpload/ThumbnailUpload";
import { TagEditor } from "../Tags/TagsEditor";
import { PerkEditor } from "./PerkEditor";

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

  const handleAddSection = (index?: number) => {
    const newId = new ObjectId().toHexString();
    const newSection = { _id: newId, title: "", content: undefined } as Section;

    if (index !== undefined) {
      // Insert after specified index
      const updatedSections = [...sections];
      updatedSections.splice(index + 1, 0, newSection);
      setSections(updatedSections);
    } else {
      // Add to the end (original behavior)
      setSections([...sections, newSection]);
    }
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = (values: any) => {
    const buildData = {
      ...values,
      sections,
      tags: values.tags.map((tag: Tag) => tag.name),
    };
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
      updateBuild(build._id, buildData)
        .then((data) => {
          notifications.show({
            title: "Build Updated",
            message: "Your build has been updated successfully.",
          });
          onSave(data);
        })
        .catch((error) => {
          notifications.show({
            title: "Build Update Failed",
            message: error.message,
            color: "red",
          });
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
          <Title order={2}>Build Editor</Title>
          <Group align="end">
            <TextInput
              label="Build Name"
              placeholder="Unique build name"
              required
              size="xl"
              width={500}
              {...form.getInputProps("name")}
            />
            <DeleteButton onDelete={handleDeleteBuild} />
            <Button type="submit">Save Build</Button>
          </Group>
          <Group>
            <ThumbnailUpload buildId={build._id} />
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
              w={100}
              {...form.getInputProps("season")}
            />
            <MultiSelect
              label="Weapons"
              required
              data={weapons}
              w={260}
              {...form.getInputProps("weapons")}
            />
          </Group>
          <TagEditor {...form.getInputProps("tags")} />
          <PerkEditor {...form.getInputProps("perks")} />
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
            <Stack key={index} gap="xs">
              <SectionEditor
                section={section}
                onChange={(key: string, value: string) => handleSectionChange(index, key, value)}
                onRemove={() => handleRemoveSection(index)}
              />
              <Button
                variant="default"
                size="xs"
                fullWidth
                onClick={() => handleAddSection(index)}
                style={{ alignSelf: "center", borderStyle: "dashed" }}
              >
                Add Section
              </Button>
            </Stack>
          ))}
        </Stack>
      </form>
    </Container>
  );
};

export default BuildEditor;
