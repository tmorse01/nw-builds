import { useState } from "react";
import { Group, Switch, useMantineColorScheme } from "@mantine/core";
import DarkThemeIcon from "./DarkThemeIcon";
import LightThemeIcon from "./LightThemeIcon";

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [scheme, setScheme] = useState(colorScheme);

  const handleToggle = () => {
    const newScheme = scheme === "light" ? "dark" : "light";
    setScheme(newScheme);
    toggleColorScheme();
  };

  return (
    <Group justify="end">
      <Switch
        checked={scheme === "dark"}
        onChange={handleToggle}
        onLabel={<DarkThemeIcon />}
        offLabel={<LightThemeIcon />}
      />
    </Group>
  );
}
