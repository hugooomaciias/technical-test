// src/App.tsx
import { useState, useEffect } from "react";
import type { Todo } from "./types/todo";
import { getTodos, createTodo, toggleTodoStatus, deleteTodo } from "./api/todo";
import { IconTrashFilled } from "@tabler/icons-react"

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState("");

	useEffect(() => {
		loadTodos();
	}, []);

	const loadTodos = () => {
		getTodos()
			.then((data) => {
				setTodos(data);
			})
			.catch((error) => {
				console.error("Failed to load todos:", error);
			});
	};

	const addTodo = () => {
		if (!title.trim()) return;

		createTodo(title)
			.then(() => {
      			setTitle("");
				loadTodos();
    		})
    		.catch((error) => {
      			console.error("Failed to create todo:", error);
    		});
	};

	const toggleTodo = (id: number) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		toggleTodoStatus(id, todo.completed)
			.then(() => {
				loadTodos()
			})
			.catch((error) => {
      			console.error("Failed to change todo status:", error);
    		});
	};

	const removeTodo = (id: number) => {
		const todo = todos.some((t) => t.id === id);
		if (!todo) return;

		deleteTodo(id)
			.then(() => {
				loadTodos()
			})
			.catch((error) => {
      			console.error("Failed to delete todo:", error);
    		});
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
				<h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>

				<div className="flex gap-2 mb-8">
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Add a new task..."
						className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<button
						onClick={addTodo}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
					>
						Add
					</button>
				</div>

				<ul className="space-y-2">
					{todos.map((todo) => (
						<li
							key={todo.id}
							className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
						>
							<div className={`flex items-center gap-2 ${todo.completed ? "line-through text-gray-400" : ""}`}>
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
									className="cursor-pointer"
								/>
								
								<span>{todo.title}</span>
							</div>

							<button
								onClick={() => removeTodo(todo.id)}
								aria-label="Delete todo"
								className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg transition-all duration-200 cursor-pointer"
							>
								<IconTrashFilled className="h-5 w-5" />
								<span>Delete</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
