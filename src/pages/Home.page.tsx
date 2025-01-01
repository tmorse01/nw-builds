import React from "react";
import { Welcome } from "../components/Welcome/Welcome";

export const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ padding: "2rem" }}>
        <Welcome />
      </div>
    </>
  );
};
