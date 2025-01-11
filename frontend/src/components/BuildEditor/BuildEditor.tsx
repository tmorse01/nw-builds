import { useState } from "react";
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
import { createBuild, updateBuild } from "@/data/api";
import { Build } from "@/data/types";

interface BuildEditorProps {
  build?: Build;
  onSave: (build: Build) => void;
  onCancel: () => void;
}

const defaultBuild: Omit<Build, "_id"> = {
  name: "",
  weapons: [],
  attributes: { strength: 5, dexterity: 5, intelligence: 5, focus: 5, constitution: 5 },
  playstyle: "",
  thumbnail: "",
  tags: [],
  sections: [],
  createdBy: "",
  isActive: false,
  season: undefined,
};

const BuildEditor: React.FC<BuildEditorProps> = ({ build, onSave }) => {
  const [sections, setSections] = useState([...(build?.sections ?? [])]);
  const form = useForm({
    initialValues: build ?? defaultBuild,
  });

  const handleSectionChange = (index: number, key: string, value: string) => {
    const keyName = key as "title" | "content";
    const updatedSections = [...sections];
    updatedSections[index][keyName] = value;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { _id: "", title: "", content: "" }]);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = (values: any) => {
    const buildData = { ...values, sections };
    if (build?._id) {
      // Update existing build
      updateBuild(build._id, buildData).then((data) => {
        notifications.show({
          title: "Build Updated",
          message: "Your build has been updated successfully.",
        });
        onSave(data);
      });
    } else {
      // Create new build
      createBuild(buildData).then((data) => {
        notifications.show({
          title: "Build Created",
          message: "Your build has been create successfully.",
        });
        onSave(data);
      });
    }
  };

  const handleFillForm = () => {
    form.setValues({
      name: "Test Build",
      weapons: ["Great Axe", "Warhammer"],
      attributes: {
        strength: 300,
        dexterity: 50,
        intelligence: 10,
        focus: 20,
        constitution: 200,
      },
      playstyle: "Aggressive frontline DPS with crowd control.",
      thumbnail: "/path/to/thumbnail.png",
      tags: ["DPS", "PvP"],
      createdBy: "Tester",
      season: 6,
    });

    setSections([
      {
        _id: "1",
        title: "Introduction",
        content: "<p>This is a test introduction for the build.</p>",
      },
      {
        _id: "2",
        title: "Weapons",
        content: "<p>Great Axe and Warhammer are the core of this build.</p>",
      },
    ]);
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

          <Button onClick={handleAddSection} variant="light">
            Add Section
          </Button>
          <Button onClick={handleFillForm} variant="default">
            Fill Form for Testing
          </Button>
          <Button type="submit">Save Build</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default BuildEditor;
