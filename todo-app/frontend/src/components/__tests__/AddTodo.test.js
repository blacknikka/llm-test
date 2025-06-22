import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from '../AddTodo';

describe('AddTodo', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  it('should render form with input and submit button', () => {
    render(<AddTodo onAddTodo={mockOnAddTodo} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /追加/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
  });

  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    render(<AddTodo onAddTodo={mockOnAddTodo} />);

    const input = screen.getByRole('textbox');
    await act(async () => {
      await user.type(input, 'New Todo Item');
    });

    expect(input).toHaveValue('New Todo Item');
  });

  it('should call onAddTodo when form is submitted with valid input', async () => {
    const user = userEvent.setup();
    render(<AddTodo onAddTodo={mockOnAddTodo} />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /追加/i });

    await act(async () => {
      await user.type(input, 'New Todo Item');
      await user.click(submitButton);
    });

    expect(mockOnAddTodo).toHaveBeenCalledWith('New Todo Item');
    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
  });

  it('should clear input after successful submission', async () => {
    const user = userEvent.setup();
    mockOnAddTodo.mockResolvedValueOnce();
    
    render(<AddTodo onAddTodo={mockOnAddTodo} />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /追加/i });

    await act(async () => {
      await user.type(input, 'New Todo Item');
      await user.click(submitButton);
    });

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should not call onAddTodo when form is submitted with empty input', async () => {
    const user = userEvent.setup();
    render(<AddTodo onAddTodo={mockOnAddTodo} />);

    const submitButton = screen.getByRole('button', { name: /追加/i });
    await act(async () => {
      await user.click(submitButton);
    });

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it('should not call onAddTodo when form is submitted with whitespace-only input', async () => {
    const user = userEvent.setup();
    render(<AddTodo onAddTodo={mockOnAddTodo} />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /追加/i });

    await act(async () => {
      await user.type(input, '   ');
      await user.click(submitButton);
    });

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it('should call onAddTodo when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<AddTodo onAddTodo={mockOnAddTodo} />);

    const input = screen.getByRole('textbox');
    await act(async () => {
      await user.type(input, 'New Todo Item{enter}');
    });

    expect(mockOnAddTodo).toHaveBeenCalledWith('New Todo Item');
    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
  });

  it('should handle async onAddTodo function', async () => {
    const user = userEvent.setup();
    mockOnAddTodo.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<AddTodo onAddTodo={mockOnAddTodo} />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /追加/i });

    await act(async () => {
      await user.type(input, 'New Todo Item');
      await user.click(submitButton);
    });

    expect(mockOnAddTodo).toHaveBeenCalledWith('New Todo Item');
  });
}); 