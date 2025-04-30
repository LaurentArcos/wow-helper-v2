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

type GoogleCell = { v: unknown } | null;
type GoogleRow = { c: GoogleCell[] };
type GoogleJson = {
  table: {
    cols: { label?: string; id: string }[];
    rows: GoogleRow[];
  };
};

export const fetchSheetData = async <T = Record<string, unknown>>(sheetName: keyof typeof gidMap): Promise<T[]> => {
  const gid = gidMap[sheetName];
  if (!gid) {
    throw new Error(`Onglet inconnu : ${sheetName}`);
  }

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${gid}`;
  const response = await fetch(url);
  const text = await response.text();

  const json = JSON.parse(text.substring(47).slice(0, -2)) as GoogleJson;
  const headers = json.table.cols.map((col) => col.label || col.id);

  const rows: T[] = json.table.rows.map((row) => {
    const rowData: Record<string, unknown> = {};
    row.c.forEach((cell, idx) => {
      rowData[headers[idx]] = cell?.v ?? null;
    });
    return rowData as T;
  });

  return rows;
};
