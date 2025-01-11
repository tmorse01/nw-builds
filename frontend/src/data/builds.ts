import { Build, Tag } from "./types";

export const listOfBuilds: Build[] = [
  {
    _id: "war-bruiser",
    name: "War Bruiser",
    tags: ["DPS", "PvP", "War"],
    weapons: ["Great Axe", "Warhammer"],
    attributes: { strength: 350, constitution: 250, dexterity: 5, intelligence: 5, focus: 5 },
    playstyle: "Focus on crowd control and high burst damage in close combat.",
    thumbnail: "/assets/thumbnails/war-bruiser.png",
    sections: [
      {
        title: "Introduction",
        content: `This guide focuses on the **Great Axe** and **War Hammer** combination, tailored for wars. 
          This build maximizes crowd control, damage output, and survivability on the frontlines.`,
      },
      {
        title: "Primary Weapon",
        content: `### Great Axe

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
        ![Expandable Example Great Axe](/assets/builds/war-bruiser/great-axe.png)
      `,
      },
      {
        title: "Secondary Weapon",
        content: `
        ### War Hammer
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
        ![War Hammer Skills](/assets/builds/war-bruiser/war-hammer-skills.png)
        ![Expandable Example War Hammer](/assets/builds/war-bruiser/war-hammer.png)`,
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
        title: "Armor",
        content: `### Armor Type: **Medium**
        There are a number of different combinations you can use, but a good starting point is:
        - Helmet: **Light**
        - Chest: **Heavy**
        - Gloves: **Medium**
        - Pants: **Heavy**
        - Boots: **Light**
        
        This setup ensures a balance of mobility, damage, and survivability.
        
        ### Perks to Prioritize:
        1. **Slash Conditioning**(x3): Slash damage absorption after taking slash damage.
        2. **Strike Conditioning**(x2): Strike damage absorption after taking strike damage.
        3. **Elemental Aversion**(x3): Reduces incoming ranged elemental damage.
        4. **Freedom**(x3): Reduces crowd control duration.
        5. **Refreshing**(x3): Reduces cooldowns for abilities.
        6. **Thorny Reflection**(x1): Reflects damage back to attackers and reduces their critical chance.
        
        ### Weapon Perks on Armor:
        - **Insatiable Gravity Well**: Reduces cooldown on Gravity Well.
        - *Others are optional*
        
        ### Gems:
        - **Opal**(x5): Use in armor to reduce incoming elemental damage.
        - **Onyx**(x2): Use in armor to reduce incoming physical damage.
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
        ],
      },
      {
        title: "Jewelry",
        content: `
        ## Amulet
        ### Perks to Prioritize:
        1. **Slash Protection**: Reduces incoming slash damage.
        2. **Health**: Increases health.
        3. **Strike Protection**: Reduces incoming strike damage. _Try to get this on your amulet, if you can't find a slash protection one._
        4. **Divine**: Increases healing received.

        ## Ring
        ### Perks to Prioritize:
        1. **Slash Damage**: Increases slash damage. _Try to get this on your ring._
        2. **Invigorated Punishment**: Increase ability damage per buff. _This is a really good ring PvP perk!_
        3. **Hearty**: Increases stamina. _Good for keeping shirking buffs up._
        4. **Strike Damage**: Increases strike damage. _Try to get this on your ring, if you can't find a slash damage one._

        ## Earring
        ### Perks to Prioritize:
        1. **Empowering Toast**: Gain empower after drinking a potion. Look for this on earrings, if you don't have endless thirst.
        2. **Fortifying Toast**: Gain fortify after drinking a potion. Look for this on earrings, if you don't have endless thirst.
        3. **Refreshing Toast**: Reduce potion cooldowns. _Good for keeping potion buffs up._
        `,
        images: [
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
        content: `- **Tumbler Feetwraps**: Gives a massive shirking bonus when dodging. Empower, Fortify, and Heal.
        - **Void Darkplate**: Armor increased by 20%. A good substitute in place of the tumbler feetwraps if you want more survivability.
        - **Anhk**: Increases healing received. Really nice for survivability, but hard to get.
        - **Endless Thirst**: Gives empower and fortify on use of potion.`,
      },
      {
        title: "Heartrune",
        content: `**Detonate**: Charge yourself with explosive energy, dealing damage to enemies around you. Upgrade to Escalating Explosion for more damage, be aware you gain rend. _Tip: Save for crashes. Basic attack to build up heartrune charge. AoE like Shockwave and Path of Destiny can build up heartrune charge quickly!_`,
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
    createdBy: "Grimz",
    isActive: true,
    season: 6,
  },
];

export const getBuildListByTag = (tags: string[] = []) => {
  if (!tags || tags.length === 0) {
    return listOfBuilds;
  }
  return listOfBuilds.filter((build) =>
    tags.every((tag) => build.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
  );
};

export const tags: Tag[] = [
  "DPS",
  "PvP",
  "PvE",
  "War",
  "Duel",
  "Siege",
  "Healer",
  "Tank",
  "Support",
  "Solo",
  "Group",
  "Bruiser",
  "Ranged",
  "Melee",
  "Crowd Control",
  "Sustain",
  "Burst",
  "AoE",
  "Single Target",
  "Mobility",
  "DoT",
];
