import React, { useState } from 'react';

const AddTodo = ({ onAddTodo }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;
        await onAddTodo(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">追加</button>
        </form>
    );
};

export default AddTodo;