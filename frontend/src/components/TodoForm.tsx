// src/components/TodoForm.tsx
import React from "react";

interface TodoFormProps {
	title: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	description: string;
	setDescription: React.Dispatch<React.SetStateAction<string>>;
	addTodo: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ title, setTitle, description, setDescription, addTodo }) => {
	return (
		<div className="flex flex-col gap-4 mb-8">
			<div className="flex flex-1 flex-col gap-2">
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Add a new task..."
					className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description (optional)"
					rows={3}
					className="px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<button
				onClick={addTodo}
				className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
			>
				Add
			</button>
		</div>
	);
};
