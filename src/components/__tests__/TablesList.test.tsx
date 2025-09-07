import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Table } from '../../modules/tables/tables.types';
import { render } from '../../test/test-utils';
import TablesList from '../TablesList';

const mockTable: Table = {
  id: '1',
  header: [
    { id: 'col1', label: 'Name' },
    { id: 'col2', label: 'Age' },
  ],
  data: [
    { id: 'row1', col1: 'John', col2: '25' },
    { id: 'row2', col1: 'Jane', col2: '30' },
  ],
};

describe('TablesList', () => {
  it('renders empty state when no tables', () => {
    render(<TablesList />, {
      preloadedState: {
        tables: { data: [] },
      },
    });

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders tables when data exists', () => {
    render(<TablesList />, {
      preloadedState: {
        tables: { data: [mockTable] },
      },
    });

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
  });

  it('renders multiple tables in chunks', () => {
    const tables = Array.from({ length: 5 }, (_, i) => ({
      ...mockTable,
      id: `table-${i}`,
    }));

    render(<TablesList />, {
      preloadedState: {
        tables: { data: tables },
      },
    });

    expect(screen.getAllByRole('table')).toHaveLength(5);
  });

  describe('table width variations', () => {
    it('renders 1 table taking full width', () => {
      const tables = [{ ...mockTable, id: 'table-1' }];

      const { container } = render(<TablesList />, {
        preloadedState: {
          tables: { data: tables },
        },
      });

      const chunkContainer = container.querySelector('.flex.gap-4');
      expect(chunkContainer).toBeInTheDocument();
      expect(chunkContainer?.children).toHaveLength(1);

      const tableContainer = chunkContainer?.children[0] as HTMLElement;
      expect(tableContainer).toHaveClass('flex-1');
    });

    it('renders 2 tables each taking 1/2 width', () => {
      const tables = Array.from({ length: 2 }, (_, i) => ({
        ...mockTable,
        id: `table-${i + 1}`,
      }));

      const { container } = render(<TablesList />, {
        preloadedState: {
          tables: { data: tables },
        },
      });

      const chunkContainer = container.querySelector('.flex.gap-4');
      expect(chunkContainer).toBeInTheDocument();
      expect(chunkContainer?.children).toHaveLength(2);

      Array.from(chunkContainer!.children).forEach(child => {
        expect(child).toHaveClass('flex-1');
      });
    });

    it('renders 3 tables each taking 1/3 width in one row', () => {
      const tables = Array.from({ length: 3 }, (_, i) => ({
        ...mockTable,
        id: `table-${i + 1}`,
      }));

      const { container } = render(<TablesList />, {
        preloadedState: {
          tables: { data: tables },
        },
      });

      const chunkContainer = container.querySelector('.flex.gap-4');
      expect(chunkContainer).toBeInTheDocument();
      expect(chunkContainer?.children).toHaveLength(3);

      Array.from(chunkContainer!.children).forEach(child => {
        expect(child).toHaveClass('flex-1');
      });
    });

    it('renders 4 tables - first 3 take 1/3 width, 4th takes full width in new row', () => {
      const tables = Array.from({ length: 4 }, (_, i) => ({
        ...mockTable,
        id: `table-${i + 1}`,
      }));

      const { container } = render(<TablesList />, {
        preloadedState: {
          tables: { data: tables },
        },
      });

      const chunkContainers = container.querySelectorAll('.flex.gap-4');
      expect(chunkContainers).toHaveLength(2);

      const firstRow = chunkContainers[0];
      expect(firstRow.children).toHaveLength(3);
      Array.from(firstRow.children).forEach(child => {
        expect(child).toHaveClass('flex-1');
      });

      const secondRow = chunkContainers[1];
      expect(secondRow.children).toHaveLength(1);
      expect(secondRow.children[0]).toHaveClass('flex-1');
    });

    it('renders 5 tables - first 3 in first row, next 2 in second row (1/2 width each)', () => {
      const tables = Array.from({ length: 5 }, (_, i) => ({
        ...mockTable,
        id: `table-${i + 1}`,
      }));

      const { container } = render(<TablesList />, {
        preloadedState: {
          tables: { data: tables },
        },
      });

      const chunkContainers = container.querySelectorAll('.flex.gap-4');
      expect(chunkContainers).toHaveLength(2);

      const firstRow = chunkContainers[0];
      expect(firstRow.children).toHaveLength(3);

      const secondRow = chunkContainers[1];
      expect(secondRow.children).toHaveLength(2);
      Array.from(secondRow.children).forEach(child => {
        expect(child).toHaveClass('flex-1');
      });
    });

    it('renders 6 tables - first 3 in first row, next 3 in second row (1/3 width each)', () => {
      const tables = Array.from({ length: 6 }, (_, i) => ({
        ...mockTable,
        id: `table-${i + 1}`,
      }));

      const { container } = render(<TablesList />, {
        preloadedState: {
          tables: { data: tables },
        },
      });

      const chunkContainers = container.querySelectorAll('.flex.gap-4');
      expect(chunkContainers).toHaveLength(2);

      chunkContainers.forEach(row => {
        expect(row.children).toHaveLength(3);
        Array.from(row.children).forEach(child => {
          expect(child).toHaveClass('flex-1');
        });
      });
    });

    it('renders 7 tables - 3+3+1 layout', () => {
      const tables = Array.from({ length: 7 }, (_, i) => ({
        ...mockTable,
        id: `table-${i + 1}`,
      }));

      const { container } = render(<TablesList />, {
        preloadedState: {
          tables: { data: tables },
        },
      });

      const chunkContainers = container.querySelectorAll('.flex.gap-4');
      expect(chunkContainers).toHaveLength(3);

      expect(chunkContainers[0].children).toHaveLength(3);
      expect(chunkContainers[1].children).toHaveLength(3);

      expect(chunkContainers[2].children).toHaveLength(1);
      expect(chunkContainers[2].children[0]).toHaveClass('flex-1');
    });
  });
});
