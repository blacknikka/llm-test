import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    completed: false
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  it('should render todo item with correct content', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('should render completed todo with correct styling', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    render(
      <TodoItem 
        todo={completedTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    const checkbox = screen.getByRole('checkbox');
    const titleSpan = screen.getByText('Test Todo');
    
    expect(checkbox).toBeChecked();
    expect(titleSpan).toHaveClass('completed');
  });

  it('should call onToggle when checkbox is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when delete button is clicked', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('should handle todo with different id formats', () => {
    const todoWithUnderscoreId = {
      _id: 'abc123',
      title: 'Test Todo with _id',
      completed: false
    };

    render(
      <TodoItem 
        todo={todoWithUnderscoreId} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    const checkbox = screen.getByRole('checkbox');
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    
    fireEvent.click(checkbox);
    fireEvent.click(deleteButton);

    expect(mockOnToggle).toHaveBeenCalledWith('abc123');
    expect(mockOnDelete).toHaveBeenCalledWith('abc123');
  });
}); 