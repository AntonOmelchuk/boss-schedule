import dcBootsIcon from "../assets/loot/armorA/dcBoots.png";
import dcGlovesIcon from "../assets/loot/armorA/dcGloves.png";
import dcHelmetIcon from "../assets/loot/armorA/dcHelmet.png";
import dcRobeIcon from "../assets/loot/armorA/dcRobe.png";
import mjArmorIcon from "../assets/loot/armorA/mjArmor.png";
import mjPlateIcon from "../assets/loot/armorA/mjPlate.png";
import mjRobeIcon from "../assets/loot/armorA/mjRobe.png";
import tmBootsIcon from "../assets/loot/armorA/tmBoots.png";
import tmGlovesIcon from "../assets/loot/armorA/tmGloves.png";
import tmHelmetIcon from "../assets/loot/armorA/tmHelmet.png";
import tmPlateIcon from "../assets/loot/armorA/tmPlate.png";
import tmStockingsIcon from "../assets/loot/armorA/tmStockings.png";
import tmTunicIcon from "../assets/loot/armorA/tmTunic.png";
import draconicBodyIcon from "../assets/loot/armorS/draconicBody.png";
import draconicBootsIcon from "../assets/loot/armorS/draconicBoots.png";
import draconicGlovesIcon from "../assets/loot/armorS/draconicGloves.png";
import draconicHelmetIcon from "../assets/loot/armorS/draconicHelmet.png";
import icBootsIcon from "../assets/loot/armorS/icBoots.png";
import icBreastplateIcon from "../assets/loot/armorS/icBreastplate.png";
import icGaitersIcon from "../assets/loot/armorS/icGaiters.png";
import icGlovesIcon from "../assets/loot/armorS/icGloves.png";
import icHelmetIcon from "../assets/loot/armorS/icHelmet.png";
import icShieldIcon from "../assets/loot/armorS/icShield.png";
import maBootsIcon from "../assets/loot/armorS/maBoots.png";
import maGlovesIcon from "../assets/loot/armorS/maGloves.png";
import maHelmetIcon from "../assets/loot/armorS/maHelmet.png";
import maRobeIcon from "../assets/loot/armorS/maRobe.png";
import ttEarringIcon from "../assets/loot/jewelry/ttEarring.png";
import ttNecklaseIcon from "../assets/loot/jewelry/ttNecklase.png";
import ttRingIcon from "../assets/loot/jewelry/ttRing.png";
import beaaIcon from "../assets/loot/misc/beaa.png";
import beasIcon from "../assets/loot/misc/beas.png";
import bewaIcon from "../assets/loot/misc/bewa.png";
import bewsIcon from "../assets/loot/misc/bews.png";
import eaaIcon from "../assets/loot/misc/eaa.png";
import easIcon from "../assets/loot/misc/eas.png";
import ewaIcon from "../assets/loot/misc/ewa.png";
import ewsIcon from "../assets/loot/misc/ews.png";
import lsHigh76Icon from "../assets/loot/misc/lsHigh76.png";
import lsTop76Icon from "../assets/loot/misc/lsTop76.png";
import manuscriptIcon from "../assets/loot/misc/manuscript.png";
import darkLegionEdgeIcon from "../assets/loot/weaponA/darkLegionEdge.png";
import dragonGrinderIcon from "../assets/loot/weaponA/dragonGrinder.png";
import dualAIcon from "../assets/loot/weaponA/dualA.png";
import elysianIcon from "../assets/loot/weaponA/elysian.png";
import somIcon from "../assets/loot/weaponA/som.png";
import soulbowIcon from "../assets/loot/weaponA/soulbow.png";
import soulSeparatorIcon from "../assets/loot/weaponA/soulSeparator.png";
import asIcon from "../assets/loot/weaponS/angelSlayer.png";
import amIcon from "../assets/loot/weaponS/arcanaMace.png";
import balastIcon from "../assets/loot/weaponS/basaltBattlehammer.png";
import demonSplinterIcon from "../assets/loot/weaponS/demonSplinter.png";
import dbIcon from "../assets/loot/weaponS/draconicBow.png";
import dragonHunterAxeIcon from "../assets/loot/weaponS/dragonHunterAxe.png";
import dualSIcon from "../assets/loot/weaponS/dualS.png";
import fbIcon from "../assets/loot/weaponS/forgottenBlade.png";
import heavendDividerIcon from "../assets/loot/weaponS/heavensDivider.png";
import imperialStaffIcon from "../assets/loot/weaponS/imperialStaff.png";
import ssIcon from "../assets/loot/weaponS/saintSpear.png";

export const LOOT_CATEGORIES = {
  WEAPON_S: "weapon-s",
  WEAPON_A_TOP: "weapon-a-top",
  WEAPON_A: "weapon-a",
  ARMOR_S: "armor-s",
  ARMOR_A: "armor-a",
  JEWELRY: "jewelry",
  ENCHANT: "enchant",
  MISC: "misc",
};

export const ARMOR_SETS = {
  DRACONIC: "Draconic Leather",
  IC: "Imperial Crusader",
  MA: "Major Arcana",
  DC: "Dark Crystal",
  TM: "Tallum",
  MJ: "Majestic",
};

export const LOOT_PRESETS = [
  //============================================
  //            S Weapon (11 items)
  //============================================
  {
    id: "draconic_bow",
    name: "Draconic Bow",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: dbIcon,
  },
  {
    id: "angel_slayer",
    name: "Angel Slayer",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: asIcon,
  },
  {
    id: "arcana_mace",
    name: "Arcana Mace",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: amIcon,
  },
  {
    id: "heaven_divider",
    name: "Heaven's Divider",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: heavendDividerIcon,
  },
  {
    id: "dragon_hunter_axe",
    name: "Dragon Hunter Axe",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: dragonHunterAxeIcon,
  },
  {
    id: "basalt_battlehammer",
    name: "Basalt Battlehammer",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: balastIcon,
  },
  {
    id: "demon_splinter",
    name: "Demon Splinter",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: demonSplinterIcon,
  },
  {
    id: "forgotten_blade",
    name: "Forgotten Blade",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: fbIcon,
  },
  {
    id: "dual_s",
    name: "Tallum Blade*Dark Legion's Edge",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: dualSIcon,
  },
  {
    id: "imperial_staff",
    name: "Imperial Staff",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: imperialStaffIcon,
  },
  {
    id: "saint_spear",
    name: "Saint Spear",
    category: LOOT_CATEGORIES.WEAPON_S,
    grade: "S",
    icon: ssIcon,
  },

  //============================================
  //            A Weapon
  //============================================
  {
    id: "soul_bow",
    name: "Soul Bow",
    category: LOOT_CATEGORIES.WEAPON_A_TOP,
    grade: "A",
    icon: soulbowIcon,
  },
  {
    id: "sword_of_miracles",
    name: "Sword of Miracles",
    category: LOOT_CATEGORIES.WEAPON_A_TOP,
    grade: "A",
    icon: somIcon,
  },
  {
    id: "dark_legion_edge",
    name: "Dark Legion's Edge",
    category: LOOT_CATEGORIES.WEAPON_A_TOP,
    grade: "A",
    icon: darkLegionEdgeIcon,
  },
  {
    id: "soul_separator",
    name: "Soul Separator",
    category: LOOT_CATEGORIES.WEAPON_A_TOP,
    grade: "A",
    icon: soulSeparatorIcon,
  },
  {
    id: "dragon_grinder",
    name: "Dragon Grinder",
    category: LOOT_CATEGORIES.WEAPON_A_TOP,
    grade: "A",
    icon: dragonGrinderIcon,
  },
  {
    id: "elysian",
    name: "Elysian",
    category: LOOT_CATEGORIES.WEAPON_A_TOP,
    grade: "A",
    icon: elysianIcon,
  },
  {
    id: "dual_a",
    name: "Damascus*Damascus",
    category: LOOT_CATEGORIES.WEAPON_A_TOP,
    grade: "A",
    icon: dualAIcon,
  },

  //============================================
  //            S Armor
  //============================================
  {
    id: "draconic_body",
    name: "Draconic Leather Armor",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.DRACONIC,
    grade: "S",
    icon: draconicBodyIcon,
  },
  {
    id: "draconic_helmet",
    name: "Draconic Leather Helmet",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.DRACONIC,
    grade: "S",
    icon: draconicHelmetIcon,
  },
  {
    id: "draconic_gloves",
    name: "Draconic Leather Gloves",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.DRACONIC,
    grade: "S",
    icon: draconicGlovesIcon,
  },
  {
    id: "draconic_boots",
    name: "Draconic Leather Boots",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.DRACONIC,
    grade: "S",
    icon: draconicBootsIcon,
  },
  // Imperial Crusader
  {
    id: "ic_breastplate",
    name: "Imperial Crusader Breastplate",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.IC,
    grade: "S",
    icon: icBreastplateIcon,
  },
  {
    id: "ic_gaiters",
    name: "Imperial Crusader Gaiters",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.IC,
    grade: "S",
    icon: icGaitersIcon,
  },
  {
    id: "ic_helmet",
    name: "Imperial Crusader Helmet",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.IC,
    grade: "S",
    icon: icHelmetIcon,
  },
  {
    id: "ic_gloves",
    name: "Imperial Crusader Gloves",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.IC,
    grade: "S",
    icon: icGlovesIcon,
  },
  {
    id: "ic_boots",
    name: "Imperial Crusader Boots",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.IC,
    grade: "S",
    icon: icBootsIcon,
  },
  {
    id: "ic_shield",
    name: "Imperial Crusader Shield",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.IC,
    grade: "S",
    icon: icShieldIcon,
  },
  // Major Arcana
  {
    id: "ma_robe",
    name: "Major Arcana Robe",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.MA,
    grade: "S",
    icon: maRobeIcon,
  },
  {
    id: "ma_helmet",
    name: "Major Arcana Circlet",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.MA,
    grade: "S",
    icon: maHelmetIcon,
  },
  {
    id: "ma_gloves",
    name: "Major Arcana Gloves",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.MA,
    grade: "S",
    icon: maGlovesIcon,
  },
  {
    id: "ma_boots",
    name: "Major Arcana Boots",
    category: LOOT_CATEGORIES.ARMOR_S,
    set: ARMOR_SETS.MA,
    grade: "S",
    icon: maBootsIcon,
  },

  //============================================
  //            A Armor
  //============================================
  // Dark Crystal
  {
    id: "dc_robe",
    name: "Dark Crystal Robe",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.DC,
    grade: "A",
    icon: dcRobeIcon,
  },
  {
    id: "dc_helmet",
    name: "Dark Crystal Helmet",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.DC,
    grade: "A",
    icon: dcHelmetIcon,
  },
  {
    id: "dc_gloves",
    name: "Dark Crystal Gloves",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.DC,
    grade: "A",
    icon: dcGlovesIcon,
  },
  {
    id: "dc_boots",
    name: "Dark Crystal Boots",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.DC,
    grade: "A",
    icon: dcBootsIcon,
  },
  // Tallum
  {
    id: "tm_plate",
    name: "Tallum Plate Armor",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.TM,
    grade: "A",
    icon: tmPlateIcon,
  },
  {
    id: "tm_helmet",
    name: "Tallum Helm",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.TM,
    grade: "A",
    icon: tmHelmetIcon,
  },
  {
    id: "tm_gloves",
    name: "Tallum Gloves",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.TM,
    grade: "A",
    icon: tmGlovesIcon,
  },
  {
    id: "tm_boots",
    name: "Tallum Boots",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.TM,
    grade: "A",
    icon: tmBootsIcon,
  },
  {
    id: "tm_tunic",
    name: "Tallum Tunic",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.TM,
    grade: "A",
    icon: tmTunicIcon,
  },
  {
    id: "tm_stockings",
    name: "Tallum Stockings",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.TM,
    grade: "A",
    icon: tmStockingsIcon,
  },
  // Majestic
  {
    id: "mj_plate",
    name: "Majestic Plate Armor",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.MJ,
    grade: "A",
    icon: mjPlateIcon,
  },
  {
    id: "mj_robe",
    name: "Majestic Robe",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.MJ,
    grade: "A",
    icon: mjRobeIcon,
  },
  {
    id: "mj_armor",
    name: "Majestic Leather Armor",
    category: LOOT_CATEGORIES.ARMOR_A,
    set: ARMOR_SETS.MJ,
    grade: "A",
    icon: mjArmorIcon,
  },
  //============================================
  //            Jewelry
  //============================================
  {
    id: "tt_necklase",
    name: "Tateossian Necklase",
    category: LOOT_CATEGORIES.JEWELRY,
    grade: "S",
    icon: ttNecklaseIcon,
  },
  {
    id: "tt_earring",
    name: "Tateossian Earring",
    category: LOOT_CATEGORIES.JEWELRY,
    grade: "S",
    icon: ttEarringIcon,
  },
  {
    id: "tt_ring",
    name: "Tateossian Ring",
    category: LOOT_CATEGORIES.JEWELRY,
    grade: "S",
    icon: ttRingIcon,
  },

  //============================================
  //            Misc & Enchants
  //============================================
  {
    id: "bews",
    name: "BEWS (Blessed Enchant Weapon S)",
    category: LOOT_CATEGORIES.MISC,
    grade: "S",
    icon: bewsIcon,
    isStackable: true,
  },
  {
    id: "ews",
    name: "EWS (Enchant Weapon S)",
    category: LOOT_CATEGORIES.MISC,
    grade: "S",
    icon: ewsIcon,
    isStackable: true,
  },
  {
    id: "beas",
    name: "BEAS (Blessed Enchant Armor S)",
    category: LOOT_CATEGORIES.MISC,
    grade: "S",
    icon: beasIcon,
    isStackable: true,
  },
  {
    id: "eas",
    name: "EAS (Enchant Armor S)",
    category: LOOT_CATEGORIES.MISC,
    grade: "S",
    icon: easIcon,
    isStackable: true,
  },
  {
    id: "bewa",
    name: "BEWA (Blessed Enchant Weapon A)",
    category: LOOT_CATEGORIES.MISC,
    grade: "A",
    icon: bewaIcon,
    isStackable: true,
  },
  {
    id: "ewa",
    name: "EWA (Enchant Weapon A)",
    category: LOOT_CATEGORIES.MISC,
    grade: "A",
    icon: ewaIcon,
    isStackable: true,
  },
  {
    id: "beaa",
    name: "BEAA (Blessed Enchant Armor A)",
    category: LOOT_CATEGORIES.MISC,
    grade: "A",
    icon: beaaIcon,
    isStackable: true,
  },
  {
    id: "eaa",
    name: "EAA (Enchant Armor A)",
    category: LOOT_CATEGORIES.MISC,
    grade: "A",
    icon: eaaIcon,
    isStackable: true,
  },
  {
    id: "ls_76_top",
    name: "Life Stone Grade 76 - Top",
    category: LOOT_CATEGORIES.MISC,
    grade: "S",
    icon: lsTop76Icon,
    isStackable: true,
  },
  {
    id: "ls_76_high",
    name: "Life Stone Grade 76 - High",
    category: LOOT_CATEGORIES.MISC,
    grade: "S",
    icon: lsHigh76Icon,
    isStackable: true,
  },
  {
    id: "manuscript",
    name: "Ancient Book",
    category: LOOT_CATEGORIES.MISC,
    grade: "S",
    icon: manuscriptIcon,
    isStackable: true,
  },
];
