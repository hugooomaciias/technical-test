import React from "react";
import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
	todos: Todo[];
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
	toggleFavorite: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, removeTodo, toggleFavorite }) => {
	return (
		<ul className="space-y-2">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					toggleTodo={toggleTodo}
					removeTodo={removeTodo}
					toggleFavorite={toggleFavorite}
				/>
			))}
		</ul>
	);
};
