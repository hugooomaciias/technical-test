import json
from pathlib import Path

from app.models.todo import Todo

DATA_FILE = Path(__file__).resolve().parent.parent / "todos.json"

class TodoRepository:
    """Handle persistence of todos in a JSON file."""

    def __init__(self, data_file: Path = DATA_FILE) -> None:
        self.data_file = data_file

    def _load(self) -> list[Todo]:
        """Load todos from the JSON file."""
        with open(self.data_file, "r", encoding="utf-8") as f:
            return [Todo(**todo) for todo in json.load(f)]

    def _save(self, todos: list[Todo]) -> None:
        """Save todos to the JSON file."""
        with open(self.data_file, "w", encoding="utf-8") as f:
            json.dump([todo.model_dump() for todo in todos], f, indent=2)

    def get_all(self) -> list[Todo]:
        """Get all todos."""
        return self._load()

    def get_by_id(self, todo_id: int) -> Todo | None:
        """Get a todo by its ID, or None if it does not exist."""
        return next((todo for todo in self._load() if todo.id == todo_id), None)

    def create(self, todo: Todo) -> Todo:
        """Assign a new ID to the todo and save it."""
        todos = self._load()
        todo.id = max((t.id for t in todos if t.id is not None), default=0) + 1
        todos.append(todo)
        self._save(todos)
        return todo

    def update(self, todo: Todo) -> Todo | None:
        """Replace an existing todo, or return None if it does not exist."""
        todos = self._load()
        for index, current in enumerate(todos):
            if current.id == todo.id:
                todos[index] = todo
                self._save(todos)
                return todo
        return None

    def delete(self, todo_id: int) -> bool:
        """Delete a todo. Return True if it existed, False otherwise."""
        todos = self._load()
        remaining = [todo for todo in todos if todo.id != todo_id]
        if len(remaining) == len(todos):
            return False
        self._save(remaining)
        return True