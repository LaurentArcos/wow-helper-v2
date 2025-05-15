import { useState } from "react";

type CharacterStatValue = string | number | null;
type CharacterStats = Record<string, CharacterStatValue>;

type CharacterStatsProps = {
  character: {
    id: number;
    name: string;
    main_raw_img: string;
    stats?: CharacterStats;
  };
};

const STATS_FIELDS = [
  "health", "power", "power_type", "speed_rating_bonus", "armor_value", "speed_rating_normalized",
  "attack_power", "spell_power", "mana_regen", "strength_effective", "agility_effective",
  "intellect_effective", "stamina_effective", "melee_crit_value", "melee_haste_value",
  "main_hand_damage_min", "main_hand_damage_max", "main_hand_speed", "main_hand_dps",
  "off_hand_damage_min", "off_hand_damage_max", "off_hand_speed", "off_hand_dps",
  "ranged_crit_value", "ranged_haste_value", "spell_crit_value", "spell_haste_value",
  "spell_penetration", "mastery_value", "lifesteal_value", "versatility",
  "versatility_damage_done_bonus", "versatility_healing_done_bonus", "versatility_damage_taken_bonus",
  "avoidance_rating_bonus", "dodge_value", "parry_value", "block_value", "bonus_armor"
];

export default function CharacterStats({ character }: CharacterStatsProps) {
  const [isHovered, setIsHovered] = useState(false);

  const displayedStats = STATS_FIELDS
    .map((field) => [field, character[field as keyof typeof character]])
    .filter(([, value]) => value !== null && value !== 0 && value !== "");

  return (
    <div
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Filtre sombre uniquement au hover */}
      <div
        className={`absolute inset-0 z-0 bg-black transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-60" : "opacity-0"
        }`}
      />

      {/* Image du personnage */}
      <img
        src={character.main_raw_img}
        alt={character.name}
        className="absolute left-90 z-10 h-auto max-h-[100%] object-contain transition-opacity"
      />

      {/* Stats affichées au hover */}
      {isHovered && (
        <div className="absolute inset-0 p-6 overflow-y-auto z-20">
          <ul className="space-y-2">
{displayedStats.map(([keyRaw, value], index) => {
  const key = String(keyRaw);
  return (
    <li key={index} className="text-yellow-400">
      <span className="font-semibold capitalize text-white">
        {key.replace(/_/g, " ")} :
      </span>{" "}
      {String(value)}
    </li>
  );
})}
          </ul>
        </div>
      )}
    </div>
  );
}
