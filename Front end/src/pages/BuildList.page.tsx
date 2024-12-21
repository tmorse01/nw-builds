import React from "react";
import { useLocation } from "react-router-dom";
import { BuildList } from "@/components/BuildList/BuildList";

export const BuildListPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tags = params.get("tags")?.split(",");
  return (
    <>
      <BuildList tags={tags} />
    </>
  );
};
