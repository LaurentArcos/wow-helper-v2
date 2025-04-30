import { useState, useEffect } from "react";

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

const backgroundImages = [
  "/backgroundImages/chantorage1.jpg",
  "/backgroundImages/chantorage2.jpg",
  "/backgroundImages/chantorage3.jpg",
  "/backgroundImages/chantorage4.jpg",
  "/backgroundImages/nagrandBC.jpg",
  "/backgroundImages/stormwind.jpg",
  "/backgroundImages/TavernBackground.jpg",
];

const allowedStats = [
  "health", "power", "power_type", "speed_rating_bonus", "armor_value",
  "speed_rating_normalized", "attack_power", "spell_power", "mana_regen",
  "strength_effective", "agility_effective", "intellect_effective", "stamina_effective",
  "melee_crit_value", "melee_haste_value", "main_hand_damage_min", "main_hand_damage_max",
  "main_hand_speed", "main_hand_dps", "off_hand_damage_min", "off_hand_damage_max",
  "off_hand_speed", "off_hand_dps", "ranged_crit_value", "ranged_haste_value",
  "spell_crit_value", "spell_haste_value", "spell_penetration", "mastery_value",
  "lifesteal_value", "versatility", "versatility_damage_done_bonus",
  "versatility_healing_done_bonus", "versatility_damage_taken_bonus",
  "avoidance_rating_bonus", "dodge_value", "parry_value", "block_value", "bonus_armor"
];

export default function CharacterStats({ character }: CharacterStatsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

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
  
  const displayedStats = STATS_FIELDS
    .map((field) => [field, character[field as keyof typeof character]])
    .filter(([, value]) => value !== null && value !== 0 && value !== "");

  useEffect(() => {
    const randomImage =
      backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBackgroundImage(randomImage);
  }, []);

  return (
    <div
      className="relative h-screen flex items-center justify-center overflow-hidden border-r border-gray-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image de fond aléatoire */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-300 ${
          isHovered ? "opacity-30" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Image du personnage */}
      <img
        src={character.main_raw_img}
        alt={character.name}
        className={`relative z-20 h-auto max-h-[100%] object-contain transition-opacity duration-300
         `}
      />

      {/* Overlay stats au hover */}
      {isHovered && (
        <div className="absolute inset-0 p-6 overflow-y-auto z-30">
          <ul className="space-y-2">
            {displayedStats.map(([key, value]) => (
              <li key={key}  className="text-yellow-400">
                <span className="font-semibold capitalize text-white">
                  {key.replace(/_/g, " ")} :
                </span>{" "}
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
