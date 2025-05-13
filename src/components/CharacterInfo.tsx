import { Character } from "../types/Character";

interface CharacterInfoProps {
  character: Character;
}

// Correspondance FR → EN pour les icônes de classes
const classIconMap: Record<string, string> = {
  "Guerrier": "warrior",
  "Paladin": "paladin",
  "Chasseur": "hunter",
  "Voleur": "rogue",
  "Prêtre": "priest",
  "Chevalier de la mort": "deathknight",
  "Chaman": "shaman",
  "Mage": "mage",
  "Démoniste": "warlock",
  "Moine": "monk",
  "Chasseur de démons": "demonhunter",
  "Druide": "druid",
  "Évocateur": "evoker",
};

export default function CharacterInfo({ character }: CharacterInfoProps) {
  
  const classIconName = character.class && classIconMap[character.class];
  const classIconUrl = classIconName
    ? `https://render.worldofwarcraft.com/eu/icons/56/classicon_${classIconName}.jpg`
    : null;

  return (
    <div className="bg-white p-4 rounded shadow space-y-3 text-sm text-center relative flex flex-col items-center">
      
      {/* Logo faction */}
      {character.faction && (
        <img
          src={character.faction === "Alliance" ? "/alliance.png" : "/horde.png"}
          alt={character.faction}
          className="absolute top-4 left-4 w-14 h-15 opacity-80"
        />
      )}

      {/* NOM */}
      <h1 className="text-4xl font-extrabold">{character.name}</h1>
      {character.active_title && (
        <h2 className="text-xl font-semibold italic text-gray-700">{character.active_title}</h2>
      )}
      <p className="text-lg font-medium text-gray-800">
        Niveau {character.level}
        {character.item_lvl !== undefined && ` – ilvl ${character.item_lvl}`}
      </p>

      {/* Icône de classe */}
      {classIconUrl && (
        <div className="absolute top-4 right-4 flex flex-col items-center">
          <img src={classIconUrl} alt={character.class} className="w-12 h-12" />
          <span className="text-xs mt-1 text-gray-600">{character.class} {character.spec}</span>
        </div>
      )}

      {/* Infos détaillées */}
      <div className="text-left space-y-1 pt-4">
        <p><strong>Race :</strong> {character.race}</p>
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
