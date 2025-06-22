import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../api';

describe('API Utils', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchTodos', () => {
    it('should fetch todos successfully', async () => {
      const mockTodos = [
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTodos
      });

      const result = await fetchTodos();

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/todos');
      expect(result).toEqual(mockTodos);
    });

    it('should throw error when fetch fails', async () => {
      fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(fetchTodos()).rejects.toThrow('Failed to fetch todos');
    });
  });

  describe('addTodo', () => {
    it('should add todo successfully', async () => {
      const newTodo = { title: 'New Todo', completed: false };
      const mockResponse = { id: 3, ...newTodo };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await addTodo(newTodo);

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when add fails', async () => {
      const newTodo = { title: 'New Todo', completed: false };

      fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(addTodo(newTodo)).rejects.toThrow('Failed to add todo');
    });
  });

  describe('updateTodo', () => {
    it('should update todo successfully', async () => {
      const todoId = 1;
      const updatedTodo = { title: 'Updated Todo', completed: true };
      const mockResponse = { id: todoId, ...updatedTodo };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await updateTodo(todoId, updatedTodo);

      expect(fetch).toHaveBeenCalledWith(`http://localhost:5000/api/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when update fails', async () => {
      const todoId = 1;
      const updatedTodo = { title: 'Updated Todo', completed: true };

      fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(updateTodo(todoId, updatedTodo)).rejects.toThrow('Failed to update todo');
    });
  });

  describe('deleteTodo', () => {
    it('should delete todo successfully', async () => {
      const todoId = 1;
      const mockResponse = { message: 'Todo deleted successfully' };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await deleteTodo(todoId);

      expect(fetch).toHaveBeenCalledWith(`http://localhost:5000/api/todos/${todoId}`, {
        method: 'DELETE',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when delete fails', async () => {
      const todoId = 1;

      fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(deleteTodo(todoId)).rejects.toThrow('Failed to delete todo');
    });
  });
}); 