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
  skills: ISkill[];
}

export interface ITag {
  title: string;
  color: MantineColor;
}

export interface ISkill {
  name: string;
  type: "Active" | "Passive";
  description: string;
}

export interface IAttributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  focus: number;
  constitution: number;
}

export const listOfBuilds: IBuild[] = [
  {
    id: 1,
    name: "Bruiser",
    tags: [
      { title: "DPS", color: "red" },
      { title: "PvP", color: "teal" },
    ],
    weapons: ["Great Axe", "Warhammer"],
    attributes: { strength: 300, constitution: 300, dexterity: 5, intelligence: 5, focus: 5 },
    skills: [
      {
        name: "Gravity Well",
        type: "Active",
        description: "Creates a gravity vortex that pulls enemies towards it.",
      },
      {
        name: "Maelstrom",
        type: "Active",
        description: "Pulls enemies towards you and deals damage in an area around you.",
      },
      {
        name: "Charge",
        type: "Active",
        description: "Charges forward, press the button again to stop charging and attack.",
      },
    ],
    gear: ["Medium Armor", "Elemental Adversion", "Enchanted Ward"],
    perks: ["Insatiable Gravity Well", "Keen"],
    gems: ["Onyx", "Malachite"],
    playstyle: "Focus on crowd control and high burst damage in close combat.",
    thumbnail: "/assets/thumbnails/bruiser-dps.webp",
  },
  // Add more builds as needed
];

export const getBuildListByTag = (tags: string[] = []) => {
  if (!tags || tags.length === 0) {
    return listOfBuilds;
  }
  return listOfBuilds.filter((build) =>
    tags.every((tag) => build.tags.some((t) => t.title.toLowerCase() === tag.toLowerCase()))
  );
};
