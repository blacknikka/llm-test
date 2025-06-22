import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

// Mock TodoItem component
jest.mock('../TodoItem', () => {
  return function MockTodoItem({ todo, onToggle, onDelete }) {
    return (
      <div data-testid={`todo-item-${todo.id || todo._id || todo.key}`}>
        <span>{todo.title}</span>
        <button onClick={() => onToggle(todo.id || todo._id || todo.key)}>Toggle</button>
        <button onClick={() => onDelete(todo.id || todo._id || todo.key)}>Delete</button>
      </div>
    );
  };
});

describe('TodoList', () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false }
  ];

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  it('should render empty message when todos array is empty', () => {
    render(
      <TodoList 
        todos={[]} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('リストがありません')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render todo list with multiple todos', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByRole('list')).toHaveClass('todo-list');
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
  });

  it('should render todos with different id formats', () => {
    const todosWithDifferentIds = [
      { id: 1, title: 'Todo with id', completed: false },
      { _id: 'abc123', title: 'Todo with _id', completed: true },
      { key: 'xyz789', title: 'Todo with key', completed: false }
    ];

    render(
      <TodoList 
        todos={todosWithDifferentIds} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-abc123')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-xyz789')).toBeInTheDocument();
  });

  it('should pass correct props to TodoItem components', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    // Check that TodoItem components are rendered with correct content
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });

  it('should handle single todo', () => {
    const singleTodo = [{ id: 1, title: 'Single Todo', completed: false }];

    render(
      <TodoList 
        todos={singleTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByText('Single Todo')).toBeInTheDocument();
  });

  it('should not render empty message when todos exist', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.queryByText('リストがありません')).not.toBeInTheDocument();
  });
}); 