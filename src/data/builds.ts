import { MantineColor } from "@mantine/core";

export interface IBuild {
  id: string;
  name: string;
  weapons: string[];
  attributes: IAttributes;
  gear: string[];
  perks: string[];
  gems: string[];
  playstyle: string;
  thumbnail: string;
  tags: ITag[];
  skills?: ISkill[];
  sections: GuideSection[];
  details?: string; // Markdown
}

interface GuideSection {
  title: string;
  content: string; // Markdown
  images?: SectionImage[];
}

export interface SectionImage {
  src: string;
  alt: string;
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
    id: "war-bruiser",
    name: "War Bruiser",
    tags: [
      { title: "DPS", color: "red" },
      { title: "PvP", color: "teal" },
      { title: "War", color: "blue" },
    ],
    weapons: ["Great Axe", "Warhammer"],
    attributes: { strength: 350, constitution: 250, dexterity: 5, intelligence: 5, focus: 5 },
    gear: ["Medium Armor", "Elemental Adversion", "Enchanted Ward"],
    perks: ["Insatiable Gravity Well", "Keen"],
    gems: ["Onyx", "Malachite"],
    playstyle: "Focus on crowd control and high burst damage in close combat.",
    thumbnail: "/assets/thumbnails/war-bruiser.png",
    sections: [
      {
        title: "Introduction",
        content: `This guide focuses on the **Great Axe** and **War Hammer** combination, tailored for wars. 
          This build maximizes crowd control, damage output, and survivability on the frontlines.`,
      },
      {
        title: "Weapon Selection",
        content: `### Primary Weapon: **Great Axe**
        
        The Great Axe is a bruiser's bread and butter, offering strong AoE slash damage against groups and abilities to group enemies.
        
        #### Key Abilities:
        1. **Maelstrom**: Pull enemies toward you, deals damage, and eats projectiles.
        2. **Gravity Well**: Create a vortex that pulls enemies and explodes.
        3. **Charge**: A mobility skill to close gaps or escape.
        
        #### Perk Priority:
        - **Enfeebling Maelstrom**: Maelstrom inflicts a debuff that reduces enemy damage.
        - **Refreshing Move**: Reduces cooldowns on light and heavy attacks.
        - **Keen**: Increases critical hit chance.
        - **Vicious**: Increases critical hit damage.
        - **Penetrating the Empowered**: Increases armor pen against enemies with empowered buff. *(Can get on named Legendary Chopper)*
        
        #### Gem Options:
        - **Jasper**: Increase damage after taking damage.
        - **Opal**: Increase damage while stamina is not full. 
        
        #### Runestone:
        - **Punishing**: Increases melee damage.
        
        ### Examples
        ![Great Axe Skill Tree](/assets/builds/war-bruiser/great-axe-skills.png)
        ![Great Axe](/assets/builds/war-bruiser/great-axe.png)
        
        ### Secondary Weapon: **War Hammer**
        The War Hammer complements the Great Axe with high burst damage and crowd control.
        
        #### Key Abilities:
        1. **Shockwave**: A ground slam that stuns enemies in a radius.
        2. **Path of Destiny**: A linear shockwave that damages enemies in its path.
        3. **Armor Breaker**: Great opening swing that penetrates armor and inflicts rend.
        
        #### Perk Priority:
        - **Sundering Shockwave**: Shockwave inflicts rend on enemies.
        
        #### Gem Options:
        - **Onyx**: Increase damage to players above 70% health.
        - **Malachite**: Increase damage to players under crowd control effects.
        
        #### Runestone:
        - **Electrifying**: Lighting damage over time.
        - **Punishing**: Increases melee damage.
        
        ### Examples
        ![War Hammer](/assets/builds/war-bruiser/war-hammer-skills.png)
        ![War Hammer](/assets/builds/war-bruiser/war-hammer.png)`,
      },
      {
        title: "Attributes",
        content: `**Tip**: Focus on **Strength** to maximize damage and **Constitution** for survivability in wars.
          You can either go 350/250 or 300/300 for a more balanced approach.
          Dump extra attributes into constitution for more health, if you're running 350 strength.
          If running 300 con, consider putting points into strength.
          
          Experiment with putting points into focus for the CDR at 25, and increased incoming healing at 50.`,
      },
      {
        title: "Armor and Equipment",
        content: `### Armor Type: **Medium**
        There are a number of different combinations you can use, but a good starting point is:
        - Helmet: **Light**
        - Chest: **Heavy**
        - Gloves: **Medium**
        - Pants: **Heavy**
        - Boots: **Light**
        
        This setup ensures a balance of mobility, damage, and survivability.
        
        ### Perks to Prioritize:
        - **Slash Conditioning**: Slash damage absorption after taking slash damage.
        - **Strike Conditioning**: Strike damage absorption after taking strike damage.
        - **Elemental Aversion**: Reduces incoming ranged elemental damage.
        - **Freedom**: Reduces crowd control duration.
        - **Refreshing**: Reduces cooldowns for abilities.
        - **Thorny Reflection**: Reflects damage back to attackers and reduces their critical chance.
        - **Slash Protection**: Reduces incoming slash damage, try to get this on your amulet.
        - **Strike Protection**: Reduces incoming strike damage, try to get this on your amulet if you can't find a slash protection one.
        - **Slash Damage**: Increases slash damage. Try to get this on your ring.
        - **Strike Damage**: Increases strike damage. Try to get this on your ring, if you can't find a slash damage one.
        
        ### Weapon Perks on Armor:
        - **Insatiable Gravity Well**: Reduces cooldown on Gravity Well.
        - *Others are optional*
        
        ### Gems:
        - **Opal**: Use in armor to reduce incoming elemental damage. Run about 5 of these.
        - **Onyx**: Use in armor to reduce incoming physical damage. Run about 2 of these.
        - **Diamond**: Use in armor to reduce Physical / Elemental damage. This is a hybrid option.
        - **Malachite**: Use in armor to reduce Physical / Elemental damage. This is another hybrid option.
        `,
        images: [
          {
            src: "/assets/builds/war-bruiser/helmet.png",
            alt: "Helmet",
          },
          {
            src: "/assets/builds/war-bruiser/chest.png",
            alt: "Chest",
          },
          {
            src: "/assets/builds/war-bruiser/gloves.png",
            alt: "Gloves",
          },
          {
            src: "/assets/builds/war-bruiser/pants.png",
            alt: "Pants",
          },
          {
            src: "/assets/builds/war-bruiser/boots.png",
            alt: "Boots",
          },
          {
            src: "/assets/builds/war-bruiser/amulet.png",
            alt: "Amulet",
          },
          {
            src: "/assets/builds/war-bruiser/ring.png",
            alt: "Ring",
          },
          {
            src: "/assets/builds/war-bruiser/earring.png",
            alt: "Earring",
          },
        ],
      },
      {
        title: "Artifacts",
        content: `1. **Tumbler Feetwraps**: Gives a massive shirking bonus when dodging. Empower, Fortify, and Heal.
        2. **Void Darkplate**: Armor increased by 20%. A good substitute in place of the tumbler feetwraps if you want more survivability.
        3. **Anhk**: Increases healing received. Really nice for survivability, but hard to get.
        4. **Endless Thirst**: Gives empower and fortify on use of potion.`,
      },
      {
        title: "Heartrune",
        content: `**Detonate**: Charge yourself with explosive energy, dealing damage to enemies around you. Save for crashes. Basic attack to build up heartrune charge.
          AoE like Shockwave and Path of Destiny can build up heartrune charge quickly! 
          *Upgrade to Escalating Explosion for more damage, be aware you gain rend.*`,
      },
      {
        title: "Playstyle Tips",
        content: `1. **Engage with Gravity Well**:
          Start fights by catching groups of enemies in your **Gravity Well**, then follow up with a maelstrom.
          
          2. **Control the Frontline**:
            Use **Shockwave** and **Path of Destiny** to disrupt enemy positioning and protect your backline.
          
          3. **Build up empower stacks**:
            Mauler's Fury is a passive that increases damage when you hit an enemy up to 10 stacks. The goal is to build up these stacks for the crash and then use your abilities to maximize damage.
          
          4. **Coordinate with Your Team**:
            Focus on waiting for enemies to cluster, then crash with your team on points. Stagger your abilities to maximize how long players are stuck in CC.`,
      },
      {
        title: "Consumables",
        content: `- **Health Potion**: Keep multiple on hand to stay alive during extended fights.
        - **Regeneration Serem**: Maintain consistent health regeneration. Use Regen Potion if you're running low.
        - **Clensing Potion**: Remove debuffs and crowd control effects.
        - **Oakflesh Balm**: Reduces incoming physical damage.
        
        **Tip**: Always use Clensing Potion and Oakflesh Balm before engaging in a crash or clump fight.`,
      },
      {
        title: "Strengths and Weaknesses",
        content: `### Strengths:
          - High burst damage and AoE crowd control.
          - Excellent survivability on the frontlines.
          - Strong utility with **Gravity Well** and **Shockwave**.
          
          ### Weaknesses:
          - Vulnerable to ranged attacks and kiting.
          - Dependent on proper positioning for AoE effectiveness.
          - Requires good stamina management for optimal damage output.`,
      },
      {
        title: "Final Thoughts",
        content: `The **Bruiser DPS War Build** is perfect for players who want to dominate the battlefield with raw strength and tactical crowd control. Practice positioning and ability timing to maximize your impact in wars.`,
      },
    ],
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
