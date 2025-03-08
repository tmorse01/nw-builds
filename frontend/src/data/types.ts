export interface Section {
  id: string;
  title: string;
  content: string; // HTML content as a string
}

export interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  focus: number;
  constitution: number;
}

export interface Build {
  id: string;
  name: string;
  weapons: string[];
  attributes: Attributes;
  playstyle: string;
  tags: Tag[];
  sections: Section[];
  createdBy: string;
  season: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}
