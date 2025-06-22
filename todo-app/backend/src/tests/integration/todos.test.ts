import request from 'supertest';
import app from '../../app';
import Todo from '../../models/todo';
import mongoose from 'mongoose';

describe('Todo API Integration Tests', () => {
  beforeEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await Todo.deleteMany({});
    }
  });

  describe('GET /api/todos', () => {
    it('should return empty array when no todos exist', async () => {
      const response = await request(app).get('/api/todos');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all todos', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const todos = [
        { title: 'Todo 1', completed: false },
        { title: 'Todo 2', completed: true }
      ];

      await Todo.create(todos);

      const response = await request(app).get('/api/todos');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Todo 1');
      expect(response.body[1].title).toBe('Todo 2');
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const todoData = { title: 'New Todo' };

      const response = await request(app)
        .post('/api/todos')
        .send(todoData)
        .expect(201);

      expect(response.body.title).toBe('New Todo');
      expect(response.body.completed).toBe(false);
      expect(response.body._id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();

      // Verify it was saved to database if connected
      if (mongoose.connection.readyState === 1) {
        const savedTodo = await Todo.findById(response.body._id);
        expect(savedTodo).toBeDefined();
        expect(savedTodo?.title).toBe('New Todo');
      }
    });

    it('should create a todo with completed status', async () => {
      const todoData = { title: 'Completed Todo', completed: true };

      const response = await request(app)
        .post('/api/todos')
        .send(todoData)
        .expect(201);

      expect(response.body.completed).toBe(true);
    });

    it('should return 500 when title is missing', async () => {
      const todoData = { completed: false };

      const response = await request(app)
        .post('/api/todos')
        .send(todoData)
        .expect(500);

      expect(response.body.message).toBe('Error creating todo');
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update an existing todo', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const todo = await Todo.create({ title: 'Original Todo', completed: false });

      const updateData = { title: 'Updated Todo', completed: true };

      const response = await request(app)
        .put(`/api/todos/${todo._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe('Updated Todo');
      expect(response.body.completed).toBe(true);
      expect(response.body._id).toBe(todo._id.toString());

      // Verify it was updated in database
      const updatedTodo = await Todo.findById(todo._id);
      expect(updatedTodo?.title).toBe('Updated Todo');
      expect(updatedTodo?.completed).toBe(true);
    });

    it('should return 404 for non-existent todo', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const updateData = { title: 'Updated Todo', completed: true };

      const response = await request(app)
        .put(`/api/todos/${fakeId}`)
        .send(updateData)
        .expect(404);

      expect(response.body.message).toBe('Todo not found');
    });

    it('should return 500 for invalid id format', async () => {
      const updateData = { title: 'Updated Todo', completed: true };

      const response = await request(app)
        .put('/api/todos/invalid-id')
        .send(updateData)
        .expect(500);

      expect(response.body.message).toBe('Error updating todo');
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete an existing todo', async () => {
      if (mongoose.connection.readyState !== 1) {
        console.warn('Skipping test: MongoDB not connected');
        return;
      }

      const todo = await Todo.create({ title: 'Todo to Delete', completed: false });

      await request(app)
        .delete(`/api/todos/${todo._id}`)
        .expect(204);

      // Verify it was deleted from database
      const deletedTodo = await Todo.findById(todo._id);
      expect(deletedTodo).toBeNull();
    });

    it('should return 404 for non-existent todo', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .delete(`/api/todos/${fakeId}`)
        .expect(404);

      expect(response.body.message).toBe('Todo not found');
    });

    it('should return 500 for invalid id format', async () => {
      const response = await request(app)
        .delete('/api/todos/invalid-id')
        .expect(500);

      expect(response.body.message).toBe('Error deleting todo');
    });
  });

  describe('API End-to-End Workflow', () => {
    it('should handle complete CRUD workflow', async () => {
      // Create a todo
      const createResponse = await request(app)
        .post('/api/todos')
        .send({ title: 'Workflow Todo' })
        .expect(201);

      const todoId = createResponse.body._id;

      // Verify it was created
      const getResponse = await request(app)
        .get('/api/todos')
        .expect(200);

      expect(getResponse.body).toHaveLength(1);
      expect(getResponse.body[0].title).toBe('Workflow Todo');

      // Update the todo
      const updateResponse = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ title: 'Updated Workflow Todo', completed: true })
        .expect(200);

      expect(updateResponse.body.title).toBe('Updated Workflow Todo');
      expect(updateResponse.body.completed).toBe(true);

      // Delete the todo
      await request(app)
        .delete(`/api/todos/${todoId}`)
        .expect(204);

      // Verify it was deleted
      const finalGetResponse = await request(app)
        .get('/api/todos')
        .expect(200);

      expect(finalGetResponse.body).toHaveLength(0);
    });
  });
}); 