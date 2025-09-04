import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CreateTableForm, Table, UpdateCellPayload } from './tables.types';
import { createTable } from './tables.utils';

type TablesState = {
  data: Table[];
};

const initialState: TablesState = {
  data: [],
};

const tableSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<CreateTableForm>) => {
      state.data.push(createTable(action.payload));
    },
    updateCell: (state, action: PayloadAction<UpdateCellPayload>) => {
      const { tableId, rowId, field, value } = action.payload;
      const table = state.data.find(({ id }) => id === tableId);
      if (table) {
        const row = table.data.find(({ id }) => id === rowId);
        if (row) {
          row[field] = value;
        } else {
          console.error(`Row with id ${rowId} not found`);
        }
      } else {
        console.error(`Table with id ${tableId} not found`);
      }
    },
    duplicateTable: (state, action: PayloadAction<string>) => {
      const tableId = action.payload;
      const originalTable = state.data.find(({ id }) => id === tableId);
      if (originalTable) {
        const duplicatedTable = {
          ...originalTable,
          id: crypto.randomUUID(),
          data: originalTable.data.map(row => ({
            ...row,
            id: crypto.randomUUID(),
          })),
        };
        const originalIndex = state.data.findIndex(({ id }) => id === tableId);
        state.data.splice(originalIndex + 1, 0, duplicatedTable);
      } else {
        console.error(`Table with id ${tableId} not found`);
      }
    },
  },
});

export const { addTable, updateCell, duplicateTable } = tableSlice.actions;

export default tableSlice.reducer;
