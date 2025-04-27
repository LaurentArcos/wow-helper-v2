export interface Character {
  id: number;
  name: string;
  active_title?: string | null;
  level: number;
  faction: string;
  race: string;
  class: string;
  spec?: string;
  gender?: string;
  realm?: string;
  realm_id?: number;
  slug?: string;
  character_url?: string;
  item_lvl?: number;
  health?: number;
  power_type?: string;
  power?: number;
  speed?: number;
  strength?: number;
  agility?: number;
  intellect?: number;
  stamina?: number;
  bonus_armor?: number;
  mastery?: number;
  lifesteal?: number;
  versatility?: number;
}
