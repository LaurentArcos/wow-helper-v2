type Character = {
  id: number;
  name: string;
  active_title: string | null;
  level: number;
  faction: string;
  avatar_img: string;
};

type CharacterSelectorProps = {
  characters: Character[];
  selectedCharacterId: number;
  onSelectCharacter: (id: number) => void;
};

export default function CharacterSelector({ characters, selectedCharacterId, onSelectCharacter }: CharacterSelectorProps) {
  const radius = 150;

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {characters.map((character, index) => {
        const angle = (index / characters.length) * (2 * Math.PI);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Déterminer la couleur de bordure selon la faction
        const borderColor =
          selectedCharacterId === character.id
            ? character.faction === "Alliance"
              ? "border-blue-500"
              : "border-red-500"
            : "border-gray-300";

        return (
          <button
            key={character.id}
            onClick={() => onSelectCharacter(character.id)}
            className={`cursor-pointer absolute w-16 h-16 rounded-full border-3 ${borderColor} transition-transform duration-300 ease-in-out hover:scale-110 bg-white shadow-md overflow-hidden`}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <img src={character.avatar_img} alt={character.name} className="w-full h-full object-cover" />
          </button>
        );
      })}
    </div>
  );
}
