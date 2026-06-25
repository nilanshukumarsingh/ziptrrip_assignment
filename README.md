# Todo App

A simple Todo app made using React & Express.js. Users can create, edit, update and delete their todos.All todos are saved on a JSON file

## Features

There are two pages. One for showing all todos, where you can add new ones, edit the current ones, check off or make pending again, delete them, and see how many todos you have left, how many are already checked off and how many still pending. Click on one to open the details page.
The other page shows the details of a selected todo, such as its title, status, id, and creation date. You can change the status, delete the todo, or simply go back to the main todo list.

## API Endpoints

- **GET `/todos`** - Returns all todos.
- **GET `/todos/:id`** - Returns a single todo by ID.
- **POST `/todos`** - Creates a new todo.
- **PUT `/todos/:id`** - Updates an existing todo.
- **DELETE `/todos/:id`** - Deletes a todo.

## Tech Stack

- Frontend: React, Vite, Axios
- Backend: Express.js, Node.js
- Storage: JSON (`todos.json`)
