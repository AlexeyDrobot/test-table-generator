import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { Table } from '../../modules/tables/tables.types';
import { render } from '../../test/test-utils';
import TableEditable from '../TableEditable';

const mockTable: Table = {
  id: 'test-table',
  header: [
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
  ],
  data: [
    { id: 'row1', name: 'John', age: '25' },
    { id: 'row2', name: 'Jane', age: '30' },
  ],
};

describe('TableEditable', () => {
  it('renders table with headers and data', () => {
    render(<TableEditable table={mockTable} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
  });

  it('renders copy button in last header', () => {
    render(<TableEditable table={mockTable} />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();
  });

  it('dispatches updateCell action when input changes', async () => {
    const { store } = render(<TableEditable table={mockTable} />, {
      preloadedState: {
        tables: { data: [mockTable] },
      },
    });

    const input = screen.getByDisplayValue('John');

    fireEvent.change(input, { target: { value: 'Johnny' } });

    const state = store.getState();
    expect(state.tables.data[0].data[0].name).toBe('Johnny');
  });

  it('handles duplicate table action', async () => {
    const user = userEvent.setup();
    const { store } = render(<TableEditable table={mockTable} />, {
      preloadedState: {
        tables: { data: [mockTable] },
      },
    });

    const copyButton = screen.getByRole('button', { name: /copy/i });
    await user.click(copyButton);

    const state = store.getState();
    expect(state.tables.data).toHaveLength(2);
    expect(state.tables.data[1].header).toEqual(mockTable.header);
  });
});
