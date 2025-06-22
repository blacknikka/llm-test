import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { fetchTodos, addTodo, deleteTodo } from '../utils/api';

// Mock the API functions
jest.mock('../utils/api');

// Mock the components
jest.mock('../components/TodoList', () => {
  return function MockTodoList({ todos, onDelete }) {
    return (
      <div data-testid="todo-list">
        {todos.map(todo => (
          <div key={todo.id} data-testid={`todo-${todo.id}`}>
            <span>{todo.title}</span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('../components/AddTodo', () => {
  return function MockAddTodo({ onAddTodo }) {
    return (
      <div data-testid="add-todo">
        <input data-testid="todo-input" placeholder="Add a new todo" />
        <button data-testid="add-todo-submit" onClick={() => onAddTodo('New Todo')}>追加</button>
      </div>
    );
  };
});

describe('App', () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true }
  ];

  beforeEach(() => {
    fetchTodos.mockClear();
    addTodo.mockClear();
    deleteTodo.mockClear();
  });

  it('should render app title and add button', () => {
    fetchTodos.mockResolvedValue([]);
    
    render(<App />);

    expect(screen.getByText('Todo App')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /TODOを追加/i })).toBeInTheDocument();
  });

  it('should load todos on mount', async () => {
    fetchTodos.mockResolvedValue(mockTodos);
    
    render(<App />);

    await waitFor(() => {
      expect(fetchTodos).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
      expect(screen.getByTestId('todo-2')).toBeInTheDocument();
    });
  });

  it('should handle fetch todos error gracefully', async () => {
    fetchTodos.mockRejectedValue(new Error('Network error'));
    
    render(<App />);

    await waitFor(() => {
      expect(fetchTodos).toHaveBeenCalledTimes(1);
    });

    // Should render empty todo list
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  it('should show modal when add button is clicked', async () => {
    const user = userEvent.setup();
    fetchTodos.mockResolvedValue([]);
    
    render(<App />);

    const addButton = screen.getByRole('button', { name: /TODOを追加/i });
    await act(async () => {
      await user.click(addButton);
    });

    expect(screen.getByTestId('add-todo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    fetchTodos.mockResolvedValue([]);
    
    render(<App />);

    // Open modal
    const addButton = screen.getByRole('button', { name: /TODOを追加/i });
    await act(async () => {
      await user.click(addButton);
    });

    expect(screen.getByTestId('add-todo')).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByRole('button', { name: /×/i });
    await act(async () => {
      await user.click(closeButton);
    });

    expect(screen.queryByTestId('add-todo')).not.toBeInTheDocument();
  });

  it('should add new todo when AddTodo form is submitted', async () => {
    const user = userEvent.setup();
    const newTodo = { id: 3, title: 'New Todo', completed: false };
    
    fetchTodos.mockResolvedValue(mockTodos);
    addTodo.mockResolvedValue(newTodo);
    
    render(<App />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
    });

    // Open modal and add todo
    const addButton = screen.getByRole('button', { name: /TODOを追加/i });
    await act(async () => {
      await user.click(addButton);
    });

    const addTodoButton = screen.getByTestId('add-todo-submit');
    await act(async () => {
      await user.click(addTodoButton);
    });

    await waitFor(() => {
      expect(addTodo).toHaveBeenCalledWith({ title: 'New Todo', completed: false });
    });

    // Modal should be closed
    expect(screen.queryByTestId('add-todo')).not.toBeInTheDocument();

    // New todo should be added to the list
    await waitFor(() => {
      expect(screen.getByTestId('todo-3')).toBeInTheDocument();
    });
  });

  it('should handle add todo error gracefully', async () => {
    const user = userEvent.setup();
    
    fetchTodos.mockResolvedValue(mockTodos);
    addTodo.mockRejectedValue(new Error('Add failed'));
    
    render(<App />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
    });

    // Open modal and add todo
    const addButton = screen.getByRole('button', { name: /TODOを追加/i });
    await act(async () => {
      await user.click(addButton);
    });

    const addTodoButton = screen.getByTestId('add-todo-submit');
    await act(async () => {
      await user.click(addTodoButton);
    });

    await waitFor(() => {
      expect(addTodo).toHaveBeenCalledWith({ title: 'New Todo', completed: false });
    });

    // Modal should remain open on error
    expect(screen.getByTestId('add-todo')).toBeInTheDocument();
  });

  it('should delete todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    
    fetchTodos.mockResolvedValue(mockTodos);
    deleteTodo.mockResolvedValue({ message: 'Deleted' });
    
    render(<App />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
    });

    // Delete first todo
    const deleteButton = screen.getByTestId('todo-1').querySelector('button');
    await act(async () => {
      await user.click(deleteButton);
    });

    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(1);
    });

    // Todo should be removed from the list
    await waitFor(() => {
      expect(screen.queryByTestId('todo-1')).not.toBeInTheDocument();
    });
  });

  it('should handle delete todo error gracefully', async () => {
    const user = userEvent.setup();
    
    fetchTodos.mockResolvedValue(mockTodos);
    deleteTodo.mockRejectedValue(new Error('Delete failed'));
    
    render(<App />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
    });

    // Delete first todo
    const deleteButton = screen.getByTestId('todo-1').querySelector('button');
    await act(async () => {
      await user.click(deleteButton);
    });

    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(1);
    });

    // Todo should remain in the list on error
    expect(screen.getByTestId('todo-1')).toBeInTheDocument();
  });
}); 