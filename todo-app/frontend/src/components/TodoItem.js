import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    // Support different ID formats: id, _id, key
    const todoId = todo.id || todo._id || todo.key;
    
    return (
        <div className="todo-item">
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => onToggle(todoId)} 
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <button onClick={() => onDelete(todoId)}>Delete</button>
        </div>
    );
};

export default TodoItem;