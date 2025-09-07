import { describe, expect, it } from 'vitest';

import type { CreateTableForm } from '../tables.types';
import { createTable, makeTableChunks } from '../tables.utils';

describe('tables.utils', () => {
  describe('makeTableChunks', () => {
    it('splits array into chunks of specified size', () => {
      const array = [1, 2, 3, 4, 5, 6, 7];
      const result = makeTableChunks(array, 3);

      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('handles empty array', () => {
      const result = makeTableChunks([], 3);
      expect(result).toEqual([]);
    });

    it('handles array smaller than chunk size', () => {
      const array = [1, 2];
      const result = makeTableChunks(array, 5);

      expect(result).toEqual([[1, 2]]);
    });

    it('handles chunk size of 1', () => {
      const array = [1, 2, 3];
      const result = makeTableChunks(array, 1);

      expect(result).toEqual([[1], [2], [3]]);
    });

    it('handles array length exactly divisible by chunk size', () => {
      const array = [1, 2, 3, 4, 5, 6];
      const result = makeTableChunks(array, 2);

      expect(result).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });

    it('works with different data types', () => {
      const array = ['a', 'b', 'c', 'd', 'e'];
      const result = makeTableChunks(array, 2);

      expect(result).toEqual([['a', 'b'], ['c', 'd'], ['e']]);
    });
  });

  describe('createTable', () => {
    it('creates table with correct structure', () => {
      const formData: CreateTableForm = {
        column1: 'Name',
        column2: 'Age',
        column3: 'City',
        column4: 'Country',
      };

      const table = createTable(formData);

      expect(table.id).toBeDefined();
      expect(table.header).toHaveLength(4);
      expect(table.header[0]).toEqual({ id: 'column1', label: 'Name' });
      expect(table.header[1]).toEqual({ id: 'column2', label: 'Age' });
      expect(table.header[2]).toEqual({ id: 'column3', label: 'City' });
      expect(table.header[3]).toEqual({ id: 'column4', label: 'Country' });
    });

    it('creates table with 3 empty rows by default', () => {
      const formData: CreateTableForm = {
        column1: 'Name',
        column2: 'Age',
        column3: 'City',
        column4: 'Country',
      };

      const table = createTable(formData);

      expect(table.data).toHaveLength(3);
      table.data.forEach(row => {
        expect(row.id).toBeDefined();
        expect(row.column1).toBe('');
        expect(row.column2).toBe('');
        expect(row.column3).toBe('');
        expect(row.column4).toBe('');
      });
    });

    it('generates unique IDs for table and rows', () => {
      const formData: CreateTableForm = {
        column1: 'Name',
        column2: 'Age',
        column3: 'City',
        column4: 'Country',
      };

      const table1 = createTable(formData);
      const table2 = createTable(formData);

      expect(table1.id).not.toBe(table2.id);
      expect(table1.data[0].id).not.toBe(table1.data[1].id);
      expect(table1.data[0].id).not.toBe(table2.data[0].id);
    });
  });
});
