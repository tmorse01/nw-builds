import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BuildList } from "@/components/BuildList/BuildList";
import { TagsFilter } from "@/components/Tags/TagsFilter";

export const BuildListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tags = params.get("tags")?.split(",") || [];

  const handleTagChange = (tags: string[]) => {
    const search = new URLSearchParams(location.search);
    if (tags.length > 0) {
      search.set("tags", tags.join(","));
    } else {
      search.delete("tags");
    }
    navigate({ search: search.toString() }, { replace: true });
  };

  return (
    <>
      <TagsFilter onFilterChange={handleTagChange} />
      <BuildList tags={tags} />
    </>
  );
};
