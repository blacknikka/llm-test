import { Request, Response } from 'express';
import TodosController from '../../../controllers/todosController';
import Todo from '../../../models/todo';

// Mock the Todo model
jest.mock('../../../models/todo');

describe('TodosController', () => {
  let todosController: TodosController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    todosController = new TodosController(Todo);
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson, send: jest.fn() });
    
    mockRequest = {
      body: {},
      params: {}
    };
    
    mockResponse = {
      status: mockStatus,
      json: mockJson
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTodo', () => {
    it('should create a new todo successfully', async () => {
      const mockTodo = {
        _id: 'test-id',
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (Todo.create as jest.Mock).mockResolvedValue(mockTodo);
      
      mockRequest.body = { title: 'Test Todo' };

      await todosController.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(Todo.create).toHaveBeenCalledWith({
        title: 'Test Todo',
        completed: false
      });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(mockTodo);
    });

    it('should handle errors when creating todo', async () => {
      const error = new Error('Database error');
      (Todo.create as jest.Mock).mockRejectedValue(error);
      
      mockRequest.body = { title: 'Test Todo' };

      await todosController.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Error creating todo',
        error
      });
    });
  });

  describe('getTodos', () => {
    it('should retrieve all todos successfully', async () => {
      const mockTodos = [
        { _id: '1', title: 'Todo 1', completed: false },
        { _id: '2', title: 'Todo 2', completed: true }
      ];

      (Todo.find as jest.Mock).mockResolvedValue(mockTodos);

      await todosController.getTodos(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(Todo.find).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockTodos);
    });

    it('should handle errors when fetching todos', async () => {
      const error = new Error('Database error');
      (Todo.find as jest.Mock).mockRejectedValue(error);

      await todosController.getTodos(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Error fetching todos',
        error
      });
    });
  });

  describe('updateTodo', () => {
    it('should update a todo successfully', async () => {
      const mockUpdatedTodo = {
        _id: 'test-id',
        title: 'Updated Todo',
        completed: true,
        updatedAt: new Date()
      };

      (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedTodo);
      
      mockRequest.params = { id: 'test-id' };
      mockRequest.body = { title: 'Updated Todo', completed: true };

      await todosController.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
        'test-id',
        { title: 'Updated Todo', completed: true },
        { new: true }
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockUpdatedTodo);
    });

    it('should return 404 when todo not found', async () => {
      (Todo.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      
      mockRequest.params = { id: 'non-existent-id' };
      mockRequest.body = { title: 'Updated Todo', completed: true };

      await todosController.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Todo not found' });
    });

    it('should handle errors when updating todo', async () => {
      const error = new Error('Database error');
      (Todo.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);
      
      mockRequest.params = { id: 'test-id' };
      mockRequest.body = { title: 'Updated Todo', completed: true };

      await todosController.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Error updating todo',
        error
      });
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo successfully', async () => {
      const mockDeletedTodo = {
        _id: 'test-id',
        title: 'Todo to Delete',
        completed: false
      };

      (Todo.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedTodo);
      
      mockRequest.params = { id: 'test-id' };

      await todosController.deleteTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('test-id');
      expect(mockStatus).toHaveBeenCalledWith(204);
      expect(mockJson).not.toHaveBeenCalled();
    });

    it('should return 404 when todo not found', async () => {
      (Todo.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      
      mockRequest.params = { id: 'non-existent-id' };

      await todosController.deleteTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Todo not found' });
    });

    it('should handle errors when deleting todo', async () => {
      const error = new Error('Database error');
      (Todo.findByIdAndDelete as jest.Mock).mockRejectedValue(error);
      
      mockRequest.params = { id: 'test-id' };

      await todosController.deleteTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Error deleting todo',
        error
      });
    });
  });
}); 