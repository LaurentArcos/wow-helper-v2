import { useEffect, useState } from "react";
import { fetchSheetData } from "./utils/fetchSheetData";

export default function App() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [achats, setAchats] = useState<any[]>([]);
  const [token, setToken] = useState<any[]>([]);

  useEffect(() => {
    fetchSheetData("personnages")
      .then((data) => {
        console.log("Personnages :", data);
        setCharacters(data);
      })
      .catch(console.error);

    fetchSheetData("items")
      .then((data) => {
        console.log("Items :", data);
        setItems(data);
      })
      .catch(console.error);

    fetchSheetData("achats")
      .then((data) => {
        console.log("Achats :", data);
        setAchats(data);
      })
      .catch(console.error);

    fetchSheetData("token")
      .then((data) => {
        console.log("Token :", data);
        setToken(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Wow Helper v2</h1>
      <p>Consulte la console pour voir les données 🔥</p>
    </div>
  );
}
