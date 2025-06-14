const API_URL = 'http://localhost:5000/api/todos';

export const fetchTodos = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return await response.json();
};

export const addTodo = async (todo) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to add todo');
    }
    return await response.json();
};

export const updateTodo = async (id, updatedTodo) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    return await response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
    return await response.json();
};