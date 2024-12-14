import React from "react";
import { BuildList } from "@/components/BuildList/BuildList";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "../components/Welcome/Welcome";

export const HomePage: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <ColorSchemeToggle />
      <Welcome />
      <BuildList />
    </div>
  );
};
