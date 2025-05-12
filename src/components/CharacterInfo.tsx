import { Character } from "../types/Character";

interface CharacterInfoProps {
  character: Character;
}

export default function CharacterInfo({ character }: CharacterInfoProps) {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2 text-sm">
      <h2 className="text-2xl font-bold">{character.name}</h2>
      <p><strong>Niveau :</strong> {character.level}</p>
      <p><strong>Faction :</strong> {character.faction}</p>
      <p><strong>Race :</strong> {character.race}</p>
      <p><strong>Classe :</strong> {character.class}</p>
      {character.spec && <p><strong>Spécialisation :</strong> {character.spec}</p>}
      {character.active_title && <p><strong>Titre :</strong> {character.active_title}</p>}
      {character.gender && <p><strong>Genre :</strong> {character.gender}</p>}
      {character.realm && <p><strong>Royaume :</strong> {character.realm}</p>}
      {character.item_lvl !== undefined && <p><strong>Ilvl :</strong> {character.item_lvl}</p>}

      {(character.gold || character.silver || character.copper) && (
        <p className="flex items-center gap-2">
          <strong>Argent :</strong>
          {character.gold !== undefined && (
            <span className="flex items-center gap-1">
              {character.gold}
              <img src="/gold.gif" alt="gold" className="w-4 h-4 inline" />
            </span>
          )}
          {character.silver !== undefined && (
            <span className="flex items-center gap-1">
              {character.silver}
              <img src="/silver.gif" alt="silver" className="w-4 h-4 inline" />
            </span>
          )}
          {character.copper !== undefined && (
            <span className="flex items-center gap-1">
              {character.copper}
              <img src="/copper.gif" alt="copper" className="w-4 h-4 inline" />
            </span>
          )}
        </p>
      )}

      {character.current_exact_position && (
        <p><strong>Position actuelle :</strong> {character.current_exact_position}</p>
      )}
      {character.current_exact_region && (
        <p><strong>Région actuelle :</strong> {character.current_exact_region}</p>
      )}
      {character.hearthstone_bind_position && (
        <p><strong>Lien de foyer :</strong> {character.hearthstone_bind_position}</p>
      )}
      {character.hearthstone_bind_map && (
        <p><strong>Carte de foyer :</strong> {character.hearthstone_bind_map}</p>
      )}
    </div>
  );
}