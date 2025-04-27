import { useEffect, useState } from "react";
import { fetchSheetData } from "../utils/fetchSheetData";
import CharacterSelector from "../components/CharacterSelector";
import SelectedCharacter from "../components/SelectedCharacter";

type Character = {
  id: number;
  name: string;
  active_title: string | null;
  level: number;
  faction: string;
  avatar_img: string;
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

  useEffect(() => {
    async function loadCharacters() {
      const data = await fetchSheetData("personnages");
      setCharacters(data as Character[]);
      setSelectedCharacterId((data as Character[])[0]?.id ?? null);
    }
    loadCharacters();
  }, []);

  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId);

  if (!selectedCharacter) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <div className="relative">
        <CharacterSelector
          characters={characters}
          selectedCharacterId={selectedCharacterId!}
          onSelectCharacter={(id) => setSelectedCharacterId(id)}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <SelectedCharacter character={selectedCharacter} />
        </div>
      </div>
    </div>
  );
}
