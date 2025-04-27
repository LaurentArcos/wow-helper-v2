const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

const gidMap: Record<string, string> = {
  personnages: import.meta.env.VITE_GOOGLE_SHEET_GID_PERSONNAGES,
  stats_personnages: import.meta.env.VITE_GOOGLE_SHEET_GID_STATS_PERSONNAGES,
  items: import.meta.env.VITE_GOOGLE_SHEET_GID_ITEMS,
  prix: import.meta.env.VITE_GOOGLE_SHEET_GID_PRIX,
  achats: import.meta.env.VITE_GOOGLE_SHEET_GID_ACHATS,
  token: import.meta.env.VITE_GOOGLE_SHEET_GID_TOKEN,
  synthese_prix: import.meta.env.VITE_GOOGLE_SHEET_GID_SYNTHESE_PRIX,
};

export const fetchSheetData = async (sheetName: keyof typeof gidMap) => {
  const gid = gidMap[sheetName];
  if (!gid) {
    throw new Error(`Onglet inconnu : ${sheetName}`);
  }

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${gid}`;

  const response = await fetch(url);
  const text = await response.text();

  const json = JSON.parse(text.substring(47).slice(0, -2));

  const headers = json.table.cols.map((col: any) => col.label || col.id);
  const rows = json.table.rows.map((row: any) => {
    const rowData: Record<string, any> = {};
    row.c.forEach((cell: any, idx: number) => {
      rowData[headers[idx]] = cell ? cell.v : null;
    });
    return rowData;
  });

  return rows;
};
