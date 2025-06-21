import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { fetchTodos, addTodo } from './utils/api';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const loadTodos = async () => {
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        };
        loadTodos();
    }, []);

    const handleAddTodo = async (title) => {
        const newTodo = await addTodo(title);
        setTodos([...todos, newTodo]);
    };

    return (
        <div className="App">
            <h1>Todo App</h1>
            <AddTodo onAddTodo={handleAddTodo} />
            <TodoList todos={todos} />
        </div>
    );
}

export default App;