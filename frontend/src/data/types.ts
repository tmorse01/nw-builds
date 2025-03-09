export interface Section {
  _id: string;
  title: string;
  content: string | undefined;
  images: SectionImage[];
}

export interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  focus: number;
  constitution: number;
}

export interface Build {
  _id: string;
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
  perks: Perk[];
}

export interface Tag {
  _id: string;
  name: string;
  color: string;
}

export interface SectionImage {
  _id: string;
  buildId: string;
  sectionId: string;
  cloudinaryUrl: string;
  publicId: string;
  originalName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Perk {
  name: string;
  count: number;
}
