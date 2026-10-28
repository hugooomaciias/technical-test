# Todo App

Todo list manager built with FastAPI (backend) and Vite + React + TypeScript (frontend). Tasks are stored in a JSON file on the backend.

## Features

- Create tasks with a title and an optional description
- Mark tasks as completed
- Mark tasks as favorite and switch to a favorites-only view
- Delete tasks
- The list loads automatically when the page opens and after every change

## Requirements

- Python 3.10 to 3.13 (3.14 isn't supported by the pinned `pydantic-core` version)
- Node.js and npm

## How to run

1. Create a virtual environment and install the backend dependencies:

   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows (PowerShell): .venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```

2. Install the frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Run the application from the `frontend` folder:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

The API docs are available at `http://localhost:8000/docs`.

## Backend structure

```
backend/app/
├── main.py                                          # App setup and CORS
├── models/todo.py                              # Todo and TodoUpdate models
├── repositories/todo_repository.py     # Reads and writes todos.json
└── routers/todos.py                             # /todos endpoints
```

The endpoints don't access the JSON file directly. All reads and writes go through the repository, so switching to a database would only mean changing that layer.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a todo |
| PATCH | `/todos/{todo_id}` | Update `completed` and/or `favorite` |
| DELETE | `/todos/{todo_id}` | Delete a todo |

PATCH only updates the fields sent in the body, so the same endpoint is used to complete a task and to mark it as favorite. PATCH and DELETE return `404` if the todo doesn't exist.

## Possible improvements

- Use a database instead of a JSON file
- Add tests for the API and the frontend
- Allow editing a task's title and description