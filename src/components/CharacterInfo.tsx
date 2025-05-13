import { Character } from "../types/Character";

interface CharacterInfoProps {
  character: Character;
}

export default function CharacterInfo({ character }: CharacterInfoProps) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-3 text-sm text-center relative">
      
      {/* Logo en haut à droite */}
      {character.faction && (
        <img
          src={character.faction === "Alliance" ? "/alliance2.png" : "/horde2.png"}
          alt={character.faction}
          className="absolute top-4 right-4 w-14 h-15 opacity-80"
        />
      )}

      {/* NOM très gros */}
      <h1 className="text-4xl font-extrabold">{character.name}</h1>

      {/* Titre un peu plus petit */}
      {character.active_title && (
        <h2 className="text-xl font-semibold italic text-gray-700">{character.active_title}</h2>
      )}

      {/* Ligne niveau + ilvl */}
      <p className="text-lg font-medium text-gray-800">
        Niveau {character.level}
        {character.item_lvl !== undefined && ` – ilvl ${character.item_lvl}`}
      </p>

      {/* Infos détaillées */}
      <div className="text-left space-y-1 pt-4">
        <p><strong>Race :</strong> {character.race}</p>
        <p><strong>Classe :</strong> {character.class}</p>
        {character.spec && <p><strong>Spécialisation :</strong> {character.spec}</p>}
        {character.gender && <p><strong>Genre :</strong> {character.gender}</p>}
        {character.realm && <p><strong>Royaume :</strong> {character.realm}</p>}

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
    </div>
  );
}
