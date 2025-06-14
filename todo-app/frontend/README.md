# TODO Application Frontend

This is the frontend part of the TODO application built using React. The application allows users to manage their tasks efficiently without requiring user login.

## Project Structure

- **public/index.html**: The main HTML file that serves as the entry point for the application.
- **src/App.js**: The main component that manages the overall structure and state of the app.
- **src/components/**: Contains React components for the application:
  - **TodoList.js**: Renders a list of todo items.
  - **TodoItem.js**: Represents a single todo item.
  - **AddTodo.js**: Provides a form for adding new todo items.
- **src/utils/api.js**: Contains utility functions for making API calls to the backend.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd todo-app/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

- Add new todos using the form provided in the application.
- View the list of todos displayed on the main page.
- Mark todos as completed or delete them as needed.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Axios: For making HTTP requests to the backend API.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the application.