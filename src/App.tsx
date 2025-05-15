import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { fetchSheetData } from './utils/fetchSheetData';
import { Character } from './types/Character';

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

useEffect(() => {
  const fetchData = async () => {
    const data = await fetchSheetData<Character>('personnages'); 
    setCharacters(data);
    setSelectedCharacter(data[0]);
  };
  fetchData();
}, []);

  return (
    <Home />
  );
}
