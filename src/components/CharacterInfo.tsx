import { Character } from '../types/character';

interface CharacterInfoProps {
  character: Character;
}

export default function CharacterInfo({ character }: CharacterInfoProps) {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="text-2xl font-bold">{character.name}</h2>
      <p><strong>Niveau :</strong> {character.level}</p>
      <p><strong>Faction :</strong> {character.faction}</p>
      <p><strong>Race :</strong> {character.race}</p>
      <p><strong>Classe :</strong> {character.class}</p>
      {character.spec && <p><strong>Spécialisation :</strong> {character.spec}</p>}
      {character.active_title && <p><strong>Titre :</strong> {character.active_title}</p>}

    </div>
  );
}
