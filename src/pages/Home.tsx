import { useEffect, useState } from "react";
import { fetchSheetData } from "../utils/fetchSheetData";
import CharacterSelector from "../components/CharacterSelector";
import SelectedCharacter from "../components/SelectedCharacter";
import CharacterStats from "../components/Characterstats";
import CharacterInfo from "../components/CharacterInfo"; 
import { Character } from "../types/Character";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

  useEffect(() => {
    async function loadCharacters() {
      const [baseData, statsData] = await Promise.all([
        fetchSheetData<Character>("personnages"),
        fetchSheetData<Character>("stats_personnages"),
      ]);
  
      // Fusionner sur l'ID
      const merged = baseData.map((char) => {
        const stats = statsData.find((s) => s.id === char.id);
        return {
          ...char,
          ...stats,
        };
      });
  
      setCharacters(merged);
      setSelectedCharacterId(merged[0]?.id ?? null);
    }
  
    loadCharacters();
  }, []);

  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId);

  if (!selectedCharacter) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen flex flex-row">
      {/* LEFT: Image + Stats */}
      <div className="w-2/3 h-screen">
        <CharacterStats character={selectedCharacter} />
      </div>

      {/* RIGHT: Avatar + Info */}
      <div className="w-1/3 flex flex-col items-center pt-12 gap-8">
        {/* Cercle de sélection autour de l'avatar */}
        <div className="relative w-[400px] h-[400px]">
          <CharacterSelector
            characters={characters}
            selectedCharacterId={selectedCharacterId!}
            onSelectCharacter={(id) => setSelectedCharacterId(id)}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SelectedCharacter character={selectedCharacter} />
          </div>
        </div>

        {/* Infos personnage */}
        <div className="w-[80%] max-w-md">
          <CharacterInfo character={selectedCharacter} />
        </div>
      </div>
    </div>
  );
}
