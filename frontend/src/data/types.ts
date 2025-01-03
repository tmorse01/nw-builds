export interface Build {
  _id: string;
  name: string;
  weapons: string[];
  attributes: Attributes;
  playstyle: string;
  thumbnail: string;
  tags: Tag[];
  sections: Section[];
  createdBy: string;
  isActive: boolean;
  season: number | undefined;
}

interface Section {
  title: string;
  content: string; // Markdown
  images?: Image[];
}

export interface Image {
  src: string;
  alt: string;
}

export type Tag = "DPS" | "PvP" | "PvE" | "War" | "Duel" | "Siege" | "Healer" | "Tank" | "Support";

export const getTagColor = (tag: Tag) => TagColorLookup[tag];

const TagColorLookup = {
  DPS: "blue",
  PvP: "red",
  PvE: "green",
  War: "red",
  Duel: "red",
  Siege: "red",
  Healer: "purple",
  Tank: "gray",
  Support: "purple",
};

export interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  focus: number;
  constitution: number;
}
