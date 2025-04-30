export interface Character {
  id: number;
  name: string;
  active_title: string | null;
  level: number;
  faction: string;
  race: string;
  class: string;
  spec?: string;
  gender?: string;
  realm?: string;
  item_lvl?: number;
  gold?: number;
  silver?: number;
  copper?: number;
  current_exact_position?: string;
  current_exact_region?: string;
  hearthstone_bind_position?: string;
  hearthstone_bind_map?: string;
  avatar_img: string;
  main_raw_img: string;

  // Stats (optionnelles)
  health?: number;
  power?: number;
  power_type?: string;
  speed_rating_bonus?: number;
  armor_value?: number;
  speed_rating_normalized?: number;
  attack_power?: number;
  spell_power?: number;
  mana_regen?: number;

  strength_effective?: number;
  agility_effective?: number;
  intellect_effective?: number;
  stamina_effective?: number;

  melee_crit_value?: number;
  melee_haste_value?: number;
  main_hand_damage_min?: number;
  main_hand_damage_max?: number;
  main_hand_speed?: number;
  main_hand_dps?: number;
  off_hand_damage_min?: number;
  off_hand_damage_max?: number;
  off_hand_speed?: number;
  off_hand_dps?: number;

  ranged_crit_value?: number;
  ranged_haste_value?: number;

  spell_crit_value?: number;
  spell_haste_value?: number;
  spell_penetration?: number;

  mastery_value?: number;
  lifesteal_value?: number;
  versatility?: number;
  versatility_damage_done_bonus?: number;
  versatility_healing_done_bonus?: number;
  versatility_damage_taken_bonus?: number;
  avoidance_rating_bonus?: number;
  dodge_value?: number;
  parry_value?: number;
  block_value?: number;
  bonus_armor?: number;
}
