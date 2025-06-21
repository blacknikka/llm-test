import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './App.css';
import { fetchTodos, addTodo, deleteTodo } from './utils/api';

function App() {
    // TODOリストの状態
    const [todos, setTodos] = useState([]);
    // モーダル表示状態
    const [showModal, setShowModal] = useState(false);

    // 初回マウント時にTODOリストを取得
    useEffect(() => {
        loadTodos();
    }, []);

    // TODOリストをAPIから取得
    const loadTodos = async () => {
        try {
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
        } catch (error) {
            // エラー時は空リストに
            setTodos([]);
        }
    };

    // TODOを追加
    const handleAddTodo = async (title) => {
        try {
            const newTodo = await addTodo({ title, completed: false });
            setTodos([...todos, newTodo]);
            setShowModal(false);
        } catch (error) {
            // エラー処理（必要に応じて実装）
        }
    };

    // TODOを削除
    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            // エラー処理（必要に応じて実装）
        }
    };

    return (
        <div className="App">
            <h1>Todo App</h1>
            <button className="add-todo-btn" onClick={() => setShowModal(true)}>
                TODOを追加
            </button>
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