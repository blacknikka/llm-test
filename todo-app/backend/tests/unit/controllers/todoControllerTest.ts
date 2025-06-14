import request from 'supertest';
import app from '../../../src/app';

describe('Todo Controller', () => {
  describe('GET /api/todos', () => {
    it('Todo一覧を取得できること', async () => {
      const res = await request(app).get('/api/todos');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/todos', () => {
    it('新規Todoを作成できること', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'テストタスク', completed: false });
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('テストタスク');
      expect(res.body.completed).toBe(false);
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('Todoを更新できること', async () => {
      // まず新規作成
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: '更新前', completed: false });
      const id = createRes.body._id;

      // 更新
      const updateRes = await request(app)
        .put(`/api/todos/${id}`)
        .send({ title: '更新後', completed: true });
      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body.title).toBe('更新後');
      expect(updateRes.body.completed).toBe(true);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('Todoを削除できること', async () => {
      // まず新規作成
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: '削除対象', completed: false });
      const id = createRes.body._id;

      // 削除
      const deleteRes = await request(app).delete(`/api/todos/${id}`);
      expect(deleteRes.statusCode).toBe(204);
    });
  });
});