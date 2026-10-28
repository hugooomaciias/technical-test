import type { Todo } from "../types/todo";

const BASE_URL = "http://localhost:8000/todos";

export const getTodos = async (): Promise<Todo[]> => {
    const res = await fetch(BASE_URL);

    if (!res.ok) throw new Error("Failed to load todos");

    return res.json();
};

export const createTodo = async (title: string, description: string): Promise<void> => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, completed: false }),
    });

    if (!res.ok) throw new Error("Failed to create todo");
};

export const updateTodo = async (
    id: number,
    changes: Partial<Pick<Todo, "completed" | "favorite">>
): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(changes),
    });

    if (!res.ok) throw new Error("Failed to update todo");

    return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete todo");
};