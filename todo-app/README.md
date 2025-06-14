# TODO Application

This is a simple web-based TODO application that consists of a frontend built with React and a backend powered by Express. The application allows users to manage their tasks without requiring user login.

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

```
todo-app
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── todosController.js
│   │   ├── models
│   │   │   └── todo.js
│   │   ├── routes
│   │   │   └── todos.js
│   │   └── utils
│   │       └── db.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── TodoList.js
│   │   │   ├── TodoItem.js
│   │   │   └── AddTodo.js
│   │   └── utils
│   │       └── api.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Features

- **Add Todo**: Users can add new tasks to their todo list.
- **View Todos**: Users can view all their tasks in a list format.
- **Update Todo**: Users can mark tasks as completed or edit their titles.
- **Delete Todo**: Users can remove tasks from their list.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-app
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

The application will be available at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## API Endpoints

- `GET /todos`: Retrieve all todos
- `POST /todos`: Create a new todo
- `PUT /todos/:id`: Update an existing todo
- `DELETE /todos/:id`: Delete a todo

## License

This project is licensed under the MIT License.