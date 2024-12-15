import React from "react";
import { BuildList } from "@/components/BuildList/BuildList";
import { HeaderMenu } from "@/components/Header/HeaderMenu";
import { Welcome } from "../components/Welcome/Welcome";

export const HomePage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <div style={{ padding: "2rem" }}>
        <Welcome />
        <BuildList />
      </div>
    </>
  );
};
