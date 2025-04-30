import { useState } from "react";

type Character = {
  id: number;
  name: string;
  active_title: string | null;
  level: number;
  faction: string;
  avatar_img: string;
};

type SelectedCharacterProps = {
  character: Character;
};

export default function SelectedCharacter({ character }: SelectedCharacterProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Définir la couleur de bordure selon la faction
  const borderColor = character.faction === "Alliance" ? "border-blue-500" : "border-red-500";

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cercle avec avatar */}
      <div className={`relative w-40 h-40 rounded-full border-6 ${borderColor} overflow-hidden shadow-lg`}>
        {/* Avatar */}
        <img src={character.avatar_img} alt={character.name} className="w-full h-full object-cover" />

        {/* Overlay du nom */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-opacity-60 text-white text-lg font-bold transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {character.name}
        </div>
      </div>
    </div>
  );
}
