import React, { useState } from 'react';
import { addTodo } from '../utils/api';

const AddTodo = ({ onTodoAdded }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        const newTodo = { title, completed: false };
        await addTodo(newTodo);
        setTitle('');
        onTodoAdded();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodo;