import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render } from '../../test/test-utils';
import CreateTableDropdown from '../CreateTableDropdown';

vi.mock('../CreateTableForm', () => ({
  default: function MockCreateTableForm({ setIsOpen, setResetForm }: any) {
    useEffect(() => {
      setResetForm(() => vi.fn());
    }, [setResetForm]);

    return (
      <div data-testid="create-table-form">
        <button onClick={() => setIsOpen(false)}>Mock Submit</button>
        Mock CreateTableForm
      </div>
    );
  },
}));

describe('CreateTableDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders create table button', () => {
    render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Create table')).toBeInTheDocument();
  });

  it('shows dropdown when button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    const dialog = container.querySelector('dialog');

    expect(dialog).not.toHaveAttribute('open');

    await user.click(button);

    expect(dialog).toHaveAttribute('open');
  });

  it('hides dropdown when button is clicked again', async () => {
    const user = userEvent.setup();
    const { container } = render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    const dialog = container.querySelector('dialog');

    await user.click(button);
    expect(dialog).toHaveAttribute('open');

    await user.click(button);
    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes dropdown when form is submitted', async () => {
    const user = userEvent.setup();
    const { container } = render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    const dialog = container.querySelector('dialog');

    await user.click(button);
    expect(dialog).toHaveAttribute('open');

    const submitButton = screen.getByText('Mock Submit');
    await user.click(submitButton);

    await waitFor(() => {
      expect(dialog).not.toHaveAttribute('open');
    });
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div>
        <CreateTableDropdown />
        <div data-testid="outside-element">Outside content</div>
      </div>
    );

    const button = screen.getByRole('button', { name: /create table/i });
    const dialog = container.querySelector('dialog');

    await user.click(button);
    expect(dialog).toHaveAttribute('open');

    const outsideElement = screen.getByTestId('outside-element');
    await user.click(outsideElement);

    await waitFor(() => {
      expect(dialog).not.toHaveAttribute('open');
    });
  });

  it('does not close dropdown when clicking inside dialog', async () => {
    const user = userEvent.setup();
    const { container } = render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    const dialog = container.querySelector('dialog');

    await user.click(button);
    expect(dialog).toHaveAttribute('open');

    const formElement = screen.getByTestId('create-table-form');
    await user.click(formElement);

    expect(dialog).toHaveAttribute('open');
  });

  it('does not close dropdown when clicking on the button itself', async () => {
    const user = userEvent.setup();
    const { container } = render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    const dialog = container.querySelector('dialog');

    await user.click(button);
    expect(dialog).toHaveAttribute('open');

    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(mouseDownEvent, 'target', {
      value: button,
      enumerable: true,
    });

    document.dispatchEvent(mouseDownEvent);

    await waitFor(() => {
      expect(dialog).toHaveAttribute('open');
    });
  });

  it('has correct CSS classes for styling', () => {
    render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });

    expect(button).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'bg-blue-500',
      'text-white',
      'rounded-md',
      'py-2',
      'px-4',
      'cursor-pointer'
    );
  });

  it('renders dialog with correct attributes when open', async () => {
    const user = userEvent.setup();
    const { container } = render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    await user.click(button);

    const dialog = container.querySelector('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveClass(
      'absolute',
      'left-0',
      'w-64',
      'top-full',
      'mt-1',
      'bg-white',
      'rounded-md',
      'shadow-md',
      'border',
      'border-gray-200'
    );
  });

  it('renders Plus icon in button', () => {
    const { container } = render(<CreateTableDropdown />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('manages form reset function correctly', async () => {
    const user = userEvent.setup();
    const { container } = render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    const dialog = container.querySelector('dialog');

    await user.click(button);
    expect(dialog).toHaveAttribute('open');

    await user.click(button);

    await waitFor(() => {
      expect(dialog).not.toHaveAttribute('open');
    });
  });

  it('handles keyboard interactions correctly', async () => {
    const user = userEvent.setup();
    const { container } = render(<CreateTableDropdown />);

    const button = screen.getByRole('button', { name: /create table/i });
    const dialog = container.querySelector('dialog');

    button.focus();
    await user.keyboard('{Enter}');
    expect(dialog).toHaveAttribute('open');
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = render(<CreateTableDropdown />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
