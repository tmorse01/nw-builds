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
  details: string; // Markdown
}

export interface ITag {
  title: "DPS" | "PvP" | "PvE" | "War" | "Duel" | "Siege" | "Healer" | "Tank" | "Support";
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
    name: "War Bruiser",
    tags: [
      { title: "DPS", color: "red" },
      { title: "PvP", color: "teal" },
      { title: "War", color: "blue" },
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
    details: `
# Bruiser DPS War Build

This guide focuses on the **Great Axe** and **War Hammer** combination, tailored for wars in New World. This build maximizes crowd control, damage output, and survivability on the frontlines.

---

## Weapon Selection

### Primary Weapon: **Great Axe**
The Great Axe is a bruiser's bread and butter, offering strong cleave damage and mobility.

#### Key Abilities:
1. **Reap**: Pull enemies toward you and deal damage.
2. **Gravity Well**: Create a vortex that pulls enemies and explodes.
3. **Charge**: A mobility skill to close gaps or escape.

### Secondary Weapon: **War Hammer**
The War Hammer complements the Great Axe with high burst damage and crowd control.

#### Key Abilities:
1. **Shockwave**: A ground slam that stuns enemies in a radius.
2. **Path of Destiny**: A linear shockwave that damages enemies in its path.
3. **Wrecking Ball**: Slam the ground, knocking enemies down.

---

## Attributes

**Tip**: Focus on **Strength** to maximize damage and **Constitution** for survivability in wars.

---

## Armor and Equipment

### Armor Type: **Medium**
- Helmet: **Heavy**
- Chest: **Medium**
- Gloves: **Light**
- Pants: **Heavy**
- Boots: **Medium**

This setup ensures a balance of mobility, damage, and survivability.

### Perks to Prioritize:
- **Resilient**: Reduces critical damage taken.
- **Freedom**: Reduces crowd control duration.
- **Refreshing**: Reduces cooldowns for abilities.

### Gems:
- **Opal**: Inset into both weapons for damage bonus while stamina is not full.
- **Onyx**: Use in armor to reduce incoming physical damage.

---

## Skill Trees

### Great Axe: **Mauler Tree**
Focus on these passives:
- **Gravity Well**: Essential for controlling groups in wars.
- **Enduring Strike**: Grants grit for heavy attacks.
- **Mauler’s Resolve**: Gain stamina while holding the Great Axe.

### War Hammer: **Crowd Crusher Tree**
Key passives:
- **Aftershock**: Slows enemies hit by your crowd control abilities.
- **Facilitated Expedition**: Increases movement speed after landing a crowd control ability.
- **Outnumbered**: Increases damage reduction when surrounded by enemies.

---

## Playstyle Tips

1. **Engage with Gravity Well**:
   Start fights by catching groups of enemies in your **Gravity Well**, then follow up with heavy attacks or **Shockwave**.

2. **Control the Frontline**:
   Use **Shockwave** and **Path of Destiny** to disrupt enemy positioning and protect your backline.

3. **Mobility Is Key**:
   Use **Charge** to engage or disengage as needed. Save **Wrecking Ball** for emergency knockdowns.

4. **Coordinate with Your Team**:
   Focus on clustering enemies for AoE damage and capitalizing on crowd control.

---

## Consumables

- **Health Potion**: Keep multiple on hand to stay alive during extended fights.
- **Regeneration Potion**: Maintain consistent health regeneration.
- **Gemstone Dust**: Provides resistance to elemental damage.
- **Oakflesh Balm**: Reduces incoming physical damage.

---

## Strengths and Weaknesses

### Strengths:
- High burst damage and AoE crowd control.
- Excellent survivability on the frontlines.
- Strong utility with **Gravity Well** and **Shockwave**.

### Weaknesses:
- Vulnerable to ranged attacks when abilities are on cooldown.
- Dependent on proper positioning for AoE effectiveness.
- Requires good stamina management to avoid overextending.

---

## Example Build Screenshot

![Example Build](https://example.com/great-axe-build.png)

---

## Final Thoughts

The **Bruiser DPS War Build** is perfect for players who want to dominate the battlefield with raw strength and tactical crowd control. Practice positioning and ability timing to maximize your impact in wars.
    `,
  },
];

export const getBuildListByTag = (tags: string[] = []) => {
  if (!tags || tags.length === 0) {
    return listOfBuilds;
  }
  return listOfBuilds.filter((build) =>
    tags.every((tag) => build.tags.some((t) => t.title.toLowerCase() === tag.toLowerCase()))
  );
};
