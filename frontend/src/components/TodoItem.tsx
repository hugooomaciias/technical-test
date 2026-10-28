import React from "react";
import type { Todo } from "../types/todo";

import { IconTrashFilled, IconHeart, IconHeartFilled } from "@tabler/icons-react"

interface TodoItemProps {
	todo: Todo;
	toggleTodo: (id: number) => void;
	removeTodo: (id: number) => void;
	toggleFavorite: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo, toggleFavorite }) => {
	return (
		<li
			key={todo.id}
			className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
		>
			<div className={`flex items-start gap-2 ${todo.completed ? "line-through text-gray-400" : ""}`}>
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => toggleTodo(todo.id)}
					className="mt-1.5 cursor-pointer"
				/>
				
				<div className="flex flex-col">
					<span>{todo.title}</span>
					
					{todo.description && (
						<span className="text-sm text-gray-500">{todo.description}</span>
					)}
				</div>
			</div>

			<div className="flex items-center gap-2">
				<button
					onClick={() => removeTodo(todo.id)}
					aria-label="Delete todo"
					className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg transition-all duration-200 cursor-pointer"
				>
					<IconTrashFilled className="h-5 w-5" />
					<span>Delete</span>
				</button>

				<button
					onClick={() => toggleFavorite(todo.id)}
					aria-label={todo.favorite ? `Remove todo from favorites` : `Add todo to favorites`}
					className="h-10 w-10 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-lg transition-all duration-200 cursor-pointer"
				>
					{todo.favorite ? (
						<IconHeartFilled className="h-5 w-5" />
					) : (
						<IconHeart className="h-5 w-5" />
					)}
				</button>
			</div>
		</li>
	);
};
