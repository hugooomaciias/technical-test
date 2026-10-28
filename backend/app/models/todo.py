from pydantic import BaseModel

class Todo(BaseModel):
    id: int | None = None
    title: str
    description: str = ""
    favorite: bool = False
    completed: bool = False

class TodoUpdate(BaseModel):
    completed: bool | None = None
    favorite: bool | None = None