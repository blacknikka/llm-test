# TODO Application Backend

## Overview
This is the backend component of a simple TODO application. It provides a RESTful API for managing todo items, allowing users to create, read, update, and delete todos without requiring user authentication.

## Technologies Used
- Node.js
- Express
- Mongoose (for MongoDB interaction)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the database**
   Update the database connection settings in `src/utils/db.js` to match your MongoDB configuration.

4. **Start the server**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## API Endpoints

### Todos
- **GET /todos**: Retrieve all todo items.
- **POST /todos**: Create a new todo item.
- **PUT /todos/:id**: Update an existing todo item by ID.
- **DELETE /todos/:id**: Delete a todo item by ID.

## File Structure
- `src/app.js`: Entry point for the application.
- `src/controllers/todosController.js`: Contains the logic for handling todo operations.
- `src/models/todo.js`: Defines the schema for a todo item.
- `src/routes/todos.js`: Sets up the routes for the todo API.
- `src/utils/db.js`: Utility functions for database connection.

## License
This project is licensed under the MIT License.