import request from 'supertest';
import app from '../../../../src/app';
import Todo from '../../../../src/models/todo';

describe('Todo Controller', () => {
  describe('GET /api/todos', () => {
    it('should retrieve a list of todos', async () => {
      const res = await request(app).get('/api/todos');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Task', completed: false });
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('Test Task');
      expect(res.body.completed).toBe(false);
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update a todo', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Before Update', completed: false });
      const id = createRes.body._id;

      const updateRes = await request(app)
        .put(`/api/todos/${id}`)
        .send({ title: 'After Update', completed: true });
      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body.title).toBe('After Update');
      expect(updateRes.body.completed).toBe(true);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Task to Delete', completed: false });
      const id = createRes.body._id;

      const deleteRes = await request(app).delete(`/api/todos/${id}`);
      expect(deleteRes.statusCode).toBe(204);
    });
  });
});