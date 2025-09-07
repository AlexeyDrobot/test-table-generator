import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render } from '../../test/test-utils';
import CreateTableFormComponent from '../CreateTableForm';

const mockSetIsOpen = vi.fn();
const mockSetResetForm = vi.fn();

const defaultProps = {
  setIsOpen: mockSetIsOpen,
  setResetForm: mockSetResetForm,
};

describe('CreateTableFormComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    render(<CreateTableFormComponent {...defaultProps} />);

    expect(screen.getByPlaceholderText('First Column')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Second Column')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Third Column')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<CreateTableFormComponent {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /add/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('This column is required')).toHaveLength(3);
    });

    expect(mockSetIsOpen).not.toHaveBeenCalled();
  });

  it('shows validation errors when only 2 fields are filled', async () => {
    const user = userEvent.setup();
    render(<CreateTableFormComponent {...defaultProps} />);

    const column1Input = screen.getByPlaceholderText('First Column');
    const column2Input = screen.getByPlaceholderText('Second Column');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(column1Input, 'Name');
    await user.type(column2Input, 'Age');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('This column is required')).toBeInTheDocument();
    });

    expect(screen.getAllByText('This column is required')).toHaveLength(1);
    expect(mockSetIsOpen).not.toHaveBeenCalled();
  });

  it('submits form successfully when all required fields are filled', async () => {
    const user = userEvent.setup();
    const { store } = render(<CreateTableFormComponent {...defaultProps} />);

    const column1Input = screen.getByPlaceholderText('First Column');
    const column2Input = screen.getByPlaceholderText('Second Column');
    const column3Input = screen.getByPlaceholderText('Third Column');
    const selectInput = screen.getByRole('combobox');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(column1Input, 'Name');
    await user.type(column2Input, 'Age');
    await user.type(column3Input, 'Email');
    await user.selectOptions(selectInput, 'City');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    const state = store.getState();
    expect(state.tables.data).toHaveLength(1);
    expect(state.tables.data[0].header).toEqual([
      { id: 'column1', label: 'Name' },
      { id: 'column2', label: 'Age' },
      { id: 'column3', label: 'Email' },
      { id: 'column4', label: 'City' },
    ]);
  });

  it('uses default select value when not changed', async () => {
    const user = userEvent.setup();
    const { store } = render(<CreateTableFormComponent {...defaultProps} />);

    const column1Input = screen.getByPlaceholderText('First Column');
    const column2Input = screen.getByPlaceholderText('Second Column');
    const column3Input = screen.getByPlaceholderText('Third Column');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(column1Input, 'Name');
    await user.type(column2Input, 'Age');
    await user.type(column3Input, 'Email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    const state = store.getState();
    expect(state.tables.data[0].header[3]).toEqual({
      id: 'column4',
      label: 'Country',
    });
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    render(<CreateTableFormComponent {...defaultProps} />);

    const column1Input = screen.getByPlaceholderText('First Column');
    const column2Input = screen.getByPlaceholderText('Second Column');
    const column3Input = screen.getByPlaceholderText('Third Column');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(column1Input, 'Name');
    await user.type(column2Input, 'Age');
    await user.type(column3Input, 'Email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(column1Input).toHaveValue('');
      expect(column2Input).toHaveValue('');
      expect(column3Input).toHaveValue('');
    });
  });

  it('calls setResetForm with reset function on mount', () => {
    render(<CreateTableFormComponent {...defaultProps} />);

    expect(mockSetResetForm).toHaveBeenCalledWith(expect.any(Function));
  });

  it('provides reset function to parent component', () => {
    render(<CreateTableFormComponent {...defaultProps} />);

    expect(mockSetResetForm).toHaveBeenCalledWith(expect.any(Function));

    const resetFunction = mockSetResetForm.mock.calls[0][0];
    expect(typeof resetFunction).toBe('function');
  });

  it('respects maxLength attribute on inputs', async () => {
    const user = userEvent.setup();
    render(<CreateTableFormComponent {...defaultProps} />);

    const column1Input = screen.getByPlaceholderText('First Column');

    await user.type(
      column1Input,
      'This is a very long text that exceeds limit'
    );

    expect(column1Input).toHaveValue('This is a very ');
  });

  it('renders select options correctly', () => {
    render(<CreateTableFormComponent {...defaultProps} />);

    const selectInput = screen.getByRole('combobox');

    expect(screen.getByRole('option', { name: 'Country' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'City' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Street' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Home' })).toBeInTheDocument();

    expect(selectInput).toHaveValue('Country');
  });

  it('allows changing select value', async () => {
    const user = userEvent.setup();
    render(<CreateTableFormComponent {...defaultProps} />);

    const selectInput = screen.getByRole('combobox');

    await user.selectOptions(selectInput, 'Street');
    expect(selectInput).toHaveValue('Street');
  });

  it('clears validation errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<CreateTableFormComponent {...defaultProps} />);

    const column1Input = screen.getByPlaceholderText('First Column');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('This column is required')).toHaveLength(3);
    });

    await user.type(column1Input, 'Name');

    await waitFor(() => {
      expect(screen.getAllByText('This column is required')).toHaveLength(2);
    });
  });

  it('handles form submission with keyboard (Enter)', async () => {
    const user = userEvent.setup();
    const { store } = render(<CreateTableFormComponent {...defaultProps} />);

    const column1Input = screen.getByPlaceholderText('First Column');
    const column2Input = screen.getByPlaceholderText('Second Column');
    const column3Input = screen.getByPlaceholderText('Third Column');

    await user.type(column1Input, 'Name');
    await user.type(column2Input, 'Age');
    await user.type(column3Input, 'Email');

    await user.type(column3Input, '{enter}');

    await waitFor(() => {
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    const state = store.getState();
    expect(state.tables.data).toHaveLength(1);
  });
});
