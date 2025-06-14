class TodosController {
    constructor(todoModel) {
        this.todoModel = todoModel;
    }

    async createTodo(req, res) {
        try {
            const { title } = req.body;
            const newTodo = await this.todoModel.create({ title, completed: false });
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(500).json({ message: 'Error creating todo', error });
        }
    }

    async getTodos(req, res) {
        try {
            const todos = await this.todoModel.find();
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching todos', error });
        }
    }

    async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { title, completed } = req.body;
            const updatedTodo = await this.todoModel.findByIdAndUpdate(id, { title, completed }, { new: true });
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json(updatedTodo);
        } catch (error) {
            res.status(500).json({ message: 'Error updating todo', error });
        }
    }

    async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const deletedTodo = await this.todoModel.findByIdAndDelete(id);
            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting todo', error });
        }
    }
}

export default TodosController;