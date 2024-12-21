import React from "react";
import { BuildList } from "@/components/BuildList/BuildList";
import { Welcome } from "../components/Welcome/Welcome";

export const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ padding: "2rem" }}>
        <Welcome />
        <BuildList />
      </div>
    </>
  );
};
