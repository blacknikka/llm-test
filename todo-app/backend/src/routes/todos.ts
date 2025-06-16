import express from 'express';
import TodosController from '../controllers/todosController';
import Todo from '../models/todo';

const router = express.Router();
const todosController = new TodosController(Todo);

router.get('/', todosController.getTodos.bind(todosController));
router.post('/', todosController.createTodo.bind(todosController));
router.put('/:id', todosController.updateTodo.bind(todosController));
router.delete('/:id', todosController.deleteTodo.bind(todosController));

export default router;