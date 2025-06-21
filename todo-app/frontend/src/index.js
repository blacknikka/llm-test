import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './App.css'; // CSS追加
import { fetchTodos, addTodo, deleteTodo } from './utils/api';

function App() {
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
    };

    const handleAddTodo = async (title) => {
        const newTodo = await addTodo({ title, completed: false });
        setTodos([...todos, newTodo]);
        setShowModal(false);
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="App">
            <h1>Todo App</h1>
            <button className="add-todo-btn" onClick={() => setShowModal(true)}>TODOを追加</button>
            <TodoList todos={todos} onDelete={handleDeleteTodo} />
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        <AddTodo onAddTodo={handleAddTodo} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;