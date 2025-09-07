import { describe, expect, it } from 'vitest';

import tablesReducer, {
  addTable,
  duplicateTable,
  updateCell,
} from '../tables.reducer';
import type { CreateTableForm } from '../tables.types';

describe('tablesReducer', () => {
  const initialState = { data: [] };

  describe('addTable', () => {
    it('adds a new table to the state', () => {
      const formData: CreateTableForm = {
        column1: 'Name',
        column2: 'Age',
        column3: 'City',
        column4: 'Country',
      };

      const action = addTable(formData);
      const newState = tablesReducer(initialState, action);

      expect(newState.data).toHaveLength(1);
      expect(newState.data[0].header).toHaveLength(4);
      expect(newState.data[0].header[0].label).toBe('Name');
      expect(newState.data[0].data).toHaveLength(3);
    });
  });

  describe('updateCell', () => {
    it('updates cell value in existing table', () => {
      const stateWithTable = {
        data: [
          {
            id: 'table-1',
            header: [{ id: 'name', label: 'Name' }],
            data: [{ id: 'row-1', name: 'John' }],
          },
        ],
      };

      const action = updateCell({
        tableId: 'table-1',
        rowId: 'row-1',
        field: 'name',
        value: 'Jane',
      });

      const newState = tablesReducer(stateWithTable, action);
      expect(newState.data[0].data[0].name).toBe('Jane');
    });

    it('handles non-existent table gracefully', () => {
      const action = updateCell({
        tableId: 'non-existent',
        rowId: 'row-1',
        field: 'name',
        value: 'Jane',
      });

      const newState = tablesReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });
  });

  describe('duplicateTable', () => {
    it('duplicates existing table', () => {
      const stateWithTable = {
        data: [
          {
            id: 'table-1',
            header: [{ id: 'name', label: 'Name' }],
            data: [{ id: 'row-1', name: 'John' }],
          },
        ],
      };

      const action = duplicateTable('table-1');
      const newState = tablesReducer(stateWithTable, action);

      expect(newState.data).toHaveLength(2);
      expect(newState.data[1].header).toEqual(stateWithTable.data[0].header);
      expect(newState.data[1].data[0].name).toBe('John');
      expect(newState.data[1].id).not.toBe('table-1'); // New ID
    });
  });
});
