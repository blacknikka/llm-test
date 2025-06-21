import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
    if (!todos.length) {
        return <div className="empty-list">リストがありません</div>;
    }
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onToggle={onToggle} 
                    onDelete={onDelete} 
                />
            ))}
        </ul>
    );
};

export default TodoList;