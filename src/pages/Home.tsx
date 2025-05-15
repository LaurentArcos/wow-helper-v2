import { useEffect, useState } from "react";
import { fetchSheetData } from "../utils/fetchSheetData";
import CharacterSelector from "../components/CharacterSelector";
import SelectedCharacter from "../components/SelectedCharacter";
import CharacterStats from "../components/Characterstats";
import CharacterInfo from "../components/CharacterInfo";
import { Character } from "../types/Character";

const backgroundImages = [
  "/backgroundImages/chantorage1.jpg",
  "/backgroundImages/chantorage2.jpg",
  "/backgroundImages/chantorage3.jpg",
  "/backgroundImages/chantorage4.jpg",
  "/backgroundImages/nagrandBC.jpg",
  "/backgroundImages/stormwind.jpg",
  "/backgroundImages/TavernBackground.jpg",
  "/backgroundImages/Sainte-Chute1.jpg",
  "/backgroundImages/Sainte-Chute2.jpg",
  "/backgroundImages/Thrall-Anduin1.jpg",
  "/backgroundImages/Thrall-Anduin2.jpg",
  "/backgroundImages/Azj-Kahet.jpg",
];

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("/backgroundImages/TavernBackground.jpg");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageOnly, setIsImageOnly] = useState(false);

  useEffect(() => {
    async function loadCharacters() {
      const [baseData, statsData] = await Promise.all([
        fetchSheetData<Character>("personnages"),
        fetchSheetData<Character>("stats_personnages"),
      ]);

      const merged = baseData.map((char) => {
        const stats = statsData.find((s) => s.id === char.id);
        return { ...stats, ...char };
      });

      setCharacters(merged);
      setSelectedCharacterId(merged[0]?.id ?? null);
    }

    loadCharacters();

  }, []);

  const changeBackgroundImage = () => {
    const otherImages = backgroundImages.filter(img => img !== backgroundImage);
    const newImage = otherImages[Math.floor(Math.random() * otherImages.length)];
    setBackgroundImage(newImage);
  };

  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId);
  if (!selectedCharacter) return <div>Chargement...</div>;

return (
  <div className="relative min-h-screen w-full overflow-hidden">

    {/* BACKGROUND IMAGE */}
    <div
      className="absolute inset-0 z-0 transition-opacity duration-300"
      style={{
        backgroundImage: isImageOnly ? "none" : `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: isImageOnly ? "black" : "transparent",
      }}
    />

    {/* TOP-RIGHT BUTTONS */}
    <div className="absolute top-4 right-4 z-50 flex gap-3 text-3xl">
      <button onClick={changeBackgroundImage} title="Changer le fond">🔄</button>
      <button onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? "Quitter le plein écran" : "Afficher uniquement le fond"}>🖼️</button>
      {selectedCharacter?.avatar_img && (
  <button
    onClick={() => setIsImageOnly(!isImageOnly)}
    title={isImageOnly ? "Retour à l'interface" : "Afficher uniquement le personnage"}
    className="w-8 h-8 mt-1 overflow-hidden"
  >
    <img
      src={selectedCharacter.avatar_img}
      alt="Avatar"
      className="w-full h-full object-cover"
    />
  </button>
)}
    </div>

    {/* IMAGE ONLY MODE */}
    {isImageOnly && selectedCharacter && (
      <div className="absolute inset-0 z-40 bg-black flex items-center justify-center">
        <img
          src={selectedCharacter.main_raw_img}
          alt={selectedCharacter.name}
          className="w-auto h-auto max-w-none max-h-none object-contain scale-[0.7] md:scale-[1]"
        />
      </div>
    )}

    {/* NORMAL INTERFACE */}
    {!isFullscreen && !isImageOnly && (
      <div className="relative z-10 flex flex-row min-h-screen">
        {/* LEFT */}
        <div className="hidden md:block md:w-3/4 h-screen">
          <CharacterStats character={selectedCharacter} />
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/4 flex flex-col bg-black/60 items-center pt-16 gap-12">
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

          <div className="w-[80%] max-w-md">
            <CharacterInfo character={selectedCharacter} />
          </div>
        </div>
      </div>
    )}
  </div>
);
}
