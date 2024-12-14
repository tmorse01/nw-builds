export interface Build {
  id: number;
  name: string;
  role: string;
  weapons: string[];
  attributes: Record<string, number>;
  gear: string[];
  perks: string[];
  gems: string[];
  playstyle: string;
  thumbnail: string;
}

export const builds: Build[] = [
  {
    id: 1,
    name: "Bruiser",
    role: "DPS",
    weapons: ["Great Axe", "Warhammer"],
    attributes: { Strength: 300, Constitution: 300 },
    gear: ["Medium Armor", "Elemental Adversion", "Enchanted Ward"],
    perks: ["Insatiable Gravity Well", "Keen"],
    gems: ["Onyx", "Malachite"],
    playstyle: "Focus on crowd control and high burst damage in close combat.",
    thumbnail: "/assets/thumbnails/bruiser-dps.webp",
  },
  // Add more builds as needed
];
