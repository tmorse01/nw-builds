import { MantineColor } from "@mantine/core";

export interface IBuild {
  id: number;
  name: string;
  weapons: string[];
  attributes: IAttributes;
  gear: string[];
  perks: string[];
  gems: string[];
  playstyle: string;
  thumbnail: string;
  tags: ITag[];
}

export interface ITag {
  title: string;
  color: MantineColor;
}

export interface IAttributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  focus: number;
  constitution: number;
}

export const builds: IBuild[] = [
  {
    id: 1,
    name: "Bruiser",
    tags: [
      { title: "DPS", color: "red" },
      { title: "PvP", color: "teal" },
    ],
    weapons: ["Great Axe", "Warhammer"],
    attributes: { strength: 300, constitution: 300, dexterity: 5, intelligence: 5, focus: 5 },
    gear: ["Medium Armor", "Elemental Adversion", "Enchanted Ward"],
    perks: ["Insatiable Gravity Well", "Keen"],
    gems: ["Onyx", "Malachite"],
    playstyle: "Focus on crowd control and high burst damage in close combat.",
    thumbnail: "/assets/thumbnails/bruiser-dps.webp",
  },
  // Add more builds as needed
];
