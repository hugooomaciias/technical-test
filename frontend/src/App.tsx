// src/App.tsx
import { useState, useEffect } from "react";
import type { Todo } from "./types/todo";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/todo";
import { IconTrashFilled, IconHeart, IconHeartFilled } from "@tabler/icons-react"

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

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

		createTodo(title, description.trim())
			.then(() => {
      			setTitle("");
      			setDescription("");
				loadTodos();
    		})
    		.catch((error) => {
      			console.error("Failed to create todo:", error);
    		});
	};

	const toggleTodo = (id: number) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		updateTodo(id, { completed: !todo.completed })
			.then(() => {
				loadTodos()
			})
			.catch((error) => {
      			console.error("Failed to update todo status:", error);
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

	const toggleFavorite = (id: number) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		updateTodo(id, { favorite: !todo.favorite })
			.then(() => {
				loadTodos();
			})
			.catch((error) => {
      			console.error("Failed to update favorite status:", error);
    		});
	};

	const visibleTodos = showFavoritesOnly
		? todos.filter((todo) => todo.favorite)
		: todos;

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
				<h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>

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

				<div className="flex items-center justify-between mb-3">
					<h2 className="text-lg font-semibold text-gray-700">
						{showFavoritesOnly ? "Favorites" : "All"}
					</h2>

					<div className="flex items-center gap-2">
						<span id="favorites-toggle-label" className="text-sm text-gray-600">
							Favorites only
						</span>

						<button
							type="button"
							role="switch"
							aria-checked={showFavoritesOnly}
							aria-labelledby="favorites-toggle-label"
							onClick={() => setShowFavoritesOnly((prev) => !prev)}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
								showFavoritesOnly ? "bg-blue-500" : "bg-gray-300"
							}`}
						>
							<span
								className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
									showFavoritesOnly ? "translate-x-6" : "translate-x-1"
								}`}
							/>
						</button>
					</div>
				</div>

				{visibleTodos.length === 0 ? (
					<p className="py-4 text-center text-sm text-gray-500">
						{showFavoritesOnly ? "No favorite tasks yet." : "No tasks yet. Add one above."}
					</p>
				) : (
					<ul className="space-y-2">
						{visibleTodos.map((todo) => (
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
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
