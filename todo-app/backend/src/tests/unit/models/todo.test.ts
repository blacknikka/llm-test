import mongoose from 'mongoose';
import Todo from '../../../models/todo';

describe('Todo Model', () => {
  beforeAll(async () => {
    // Skip tests if MongoDB is not available
    if (mongoose.connection.readyState !== 1) {
      console.warn('MongoDB not connected, skipping model tests');
      return;
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  });

  afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await Todo.deleteMany({});
    }
  });

  describe('Todo Schema', () => {
    it('should create a todo with required fields', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const validTodo = new Todo({
        title: 'Test Todo',
        completed: false
      });

      const savedTodo = await validTodo.save();
      expect(savedTodo._id).toBeDefined();
      expect(savedTodo.title).toBe('Test Todo');
      expect(savedTodo.completed).toBe(false);
      expect(savedTodo.createdAt).toBeDefined();
      expect(savedTodo.updatedAt).toBeDefined();
    });

    it('should create a todo with default completed value', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const todoWithoutCompleted = new Todo({
        title: 'Test Todo'
      });

      const savedTodo = await todoWithoutCompleted.save();
      expect(savedTodo.completed).toBe(false);
    });

    it('should require title field', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const todoWithoutTitle = new Todo({
        completed: false
      });

      let error: any;
      try {
        await todoWithoutTitle.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.title).toBeDefined();
    });

    it('should accept boolean values for completed field', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const todoWithCompletedTrue = new Todo({
        title: 'Completed Todo',
        completed: true
      });

      const savedTodo = await todoWithCompletedTrue.save();
      expect(savedTodo.completed).toBe(true);
    });

    it('should have timestamps', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const todo = new Todo({
        title: 'Test Todo'
      });

      const savedTodo = await todo.save();
      expect(savedTodo.createdAt).toBeInstanceOf(Date);
      expect(savedTodo.updatedAt).toBeInstanceOf(Date);
    });

    it('should update timestamps on save', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const todo = new Todo({
        title: 'Test Todo'
      });

      const savedTodo = await todo.save();
      const originalUpdatedAt = savedTodo.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      savedTodo.title = 'Updated Todo';
      const updatedTodo = await savedTodo.save();

      expect(updatedTodo.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('Todo Model Methods', () => {
    it('should find todos by completed status', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      await Todo.create([
        { title: 'Todo 1', completed: false },
        { title: 'Todo 2', completed: true },
        { title: 'Todo 3', completed: false }
      ]);

      const completedTodos = await Todo.find({ completed: true });
      const incompleteTodos = await Todo.find({ completed: false });

      expect(completedTodos).toHaveLength(1);
      expect(incompleteTodos).toHaveLength(2);
    });

    it('should find todos by title using regex', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      await Todo.create([
        { title: 'Buy groceries', completed: false },
        { title: 'Clean house', completed: false },
        { title: 'Read book', completed: true }
      ]);

      const groceriesTodos = await Todo.find({
        title: { $regex: 'groceries', $options: 'i' }
      });

      expect(groceriesTodos).toHaveLength(1);
      expect(groceriesTodos[0].title).toBe('Buy groceries');
    });

    it('should sort todos by creation date', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      await Todo.create([
        { title: 'First Todo' },
        { title: 'Second Todo' },
        { title: 'Third Todo' }
      ]);

      const todos = await Todo.find().sort({ createdAt: 1 });
      expect(todos[0].title).toBe('First Todo');
      expect(todos[2].title).toBe('Third Todo');
    });
  });
}); 