import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../App';
import { render } from '../test/test-utils';

describe('App', () => {
  it('renders main layout structure', () => {
    render(<App />);

    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  it('renders CreateTableDropdown component', () => {
    render(<App />);

    const createButton = screen.getByRole('button', { name: /create table/i });
    expect(createButton).toBeInTheDocument();
  });

  it('renders TablesList component', () => {
    render(<App />);

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders TablesList with tables when data exists', () => {
    const mockTable = {
      id: 'test-table',
      header: [
        { id: 'name', label: 'Name' },
        { id: 'age', label: 'Age' },
      ],
      data: [{ id: 'row1', name: 'John', age: '25' }],
    };

    render(<App />, {
      preloadedState: {
        tables: { data: [mockTable] },
      },
    });

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
  });

  it('applies correct CSS classes for layout', () => {
    const { container } = render(<App />);
    const appDiv = container.firstChild as HTMLElement;

    expect(appDiv).toHaveClass(
      'flex',
      'min-h-svh',
      'flex-col',
      'items-stretch',
      'gap-4',
      'py-8',
      'px-12'
    );
  });
});
