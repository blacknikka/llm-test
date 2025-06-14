const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todosController');

const todosController = new TodosController();

router.get('/', todosController.getTodos.bind(todosController));
router.post('/', todosController.createTodo.bind(todosController));
router.put('/:id', todosController.updateTodo.bind(todosController));
router.delete('/:id', todosController.deleteTodo.bind(todosController));

module.exports = router;