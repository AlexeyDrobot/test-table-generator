export type CreateTableForm = {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
};

export type TableHeader = { id: string; label: string }[];

type TableData = { id: string } & Record<string, string>;

export type Table = {
  id: string;
  header: TableHeader;
  data: TableData[];
};

export type UpdateCellPayload = {
  tableId: string;
  rowId: string;
  field: string;
  value: string;
};
