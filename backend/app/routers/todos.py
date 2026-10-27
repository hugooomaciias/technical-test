from typing import Annotated

from fastapi import APIRouter, Body, HTTPException

from app.models.todo import Todo
from app.repositories.todo_repository import TodoRepository

router = APIRouter(prefix="/todos", tags=["todos"])
repository = TodoRepository()

NOT_FOUND_RESPONSE = {404: {"description": "Todo not found"}}


@router.get("", response_model=list[Todo])
def get_todos():
    """Get all todos."""
    return repository.get_all()


@router.post("", response_model=Todo)
def add_todo(todo: Todo):
    """
    Add a new todo.

    Args:
        todo (Todo): The todo to add.
    """
    return repository.create(todo)


@router.patch("/{todo_id}", response_model=Todo, responses=NOT_FOUND_RESPONSE)
def update_todo_statues(todo_id: int, completed: Annotated[bool, Body(embed=True)]):
    """
    Update the completion status of a todo.

    Args:
        todo_id (int): The ID of the todo to update.
        completed (bool): The new completion status.
    """
    todo = repository.get_by_id(todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo.completed = completed
    return repository.update(todo)


@router.delete("/{todo_id}", status_code=204, responses=NOT_FOUND_RESPONSE)
def delete_todo(todo_id: int):
    """
    Delete a todo.

    Args:
        todo_id (int): The ID of the todo to delete.
    """
    if not repository.delete(todo_id):
        raise HTTPException(status_code=404, detail="Todo not found")