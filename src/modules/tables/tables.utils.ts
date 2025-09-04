import type { CreateTableForm, Table, TableHeader } from './tables.types';

export const createTable = (tableFormData: CreateTableForm): Table => {
  const headers: TableHeader = Object.entries(tableFormData).map(
    ([key, value]) => ({ id: key, label: value })
  );

  const emptyRows = Array.from({ length: 3 }, () => {
    const row: { id: string; [key: string]: string } = {
      id: crypto.randomUUID(),
    };

    headers.forEach(header => {
      row[header.id] = '';
    });

    return row;
  });

  return { id: crypto.randomUUID(), header: headers, data: emptyRows };
};

export const makeTableChunks = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
