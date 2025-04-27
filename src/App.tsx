import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { fetchSheetData } from './utils/fetchSheetData'

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSheetData('personnages');
      setCharacters(data);
      setSelectedCharacter(data[0]); 
    };
    fetchData();
  }, []);

  return (
    <Home
      characters={characters}
      selectedCharacter={selectedCharacter}
      onSelectCharacter={setSelectedCharacter}
    />
  );
}
