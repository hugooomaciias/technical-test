// src/App.tsx
import { useState, useEffect, useCallback  } from "react";
import type { Todo } from "./types/todo";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { Toast, type ToastType } from "./components/Toast";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/todo";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
	const [toast, setToast] = useState<{ id: number; message: string; type: ToastType } | null>(null);

	useEffect(() => {
		loadTodos();
	}, []);

	const showToast = (message: string, type: ToastType) => {
		setToast({ id: Date.now(), message, type });
	};

	const closeToast = useCallback(() => {
		setToast(null);
	}, []);

	const loadTodos = () => {
		getTodos()
			.then((data) => {
				setTodos(data);
			})
			.catch((error) => {
				console.error("Failed to load todos:", error);
				showToast("Couldn't load your tasks. Please try again later.", "error");
			});
	};

	const addTodo = () => {
		if (!title.trim()) return;

		createTodo(title, description.trim())
			.then(() => {
      			setTitle("");
      			setDescription("");
				loadTodos();

				showToast("Task created", "success");
    		})
    		.catch((error) => {
      			console.error("Failed to create todo:", error);
				showToast("Couldn't create the task. Please try again.", "error");
    		});
	};

	const toggleTodo = (id: number) => {
		const todo = todos.find((t) => t.id === id);
		if (!todo) return;

		updateTodo(id, { completed: !todo.completed })
			.then(() => {
				loadTodos();
			})
			.catch((error) => {
      			console.error("Failed to update todo status:", error);
				showToast("Couldn't update the task. Please try again.", "error");
    		});
	};

	const removeTodo = (id: number) => {
		const todo = todos.some((t) => t.id === id);
		if (!todo) return;

		deleteTodo(id)
			.then(() => {
				loadTodos();
				
				showToast("Task deleted", "success");
			})
			.catch((error) => {
      			console.error("Failed to delete todo:", error);
				showToast("Couldn't delete the task. Please try again.", "error");
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
				showToast("Couldn't update favorites. Please try again.", "error");
    		});
	};

	const visibleTodos = showFavoritesOnly
		? todos.filter((todo) => todo.favorite)
		: todos;

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
				<h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>

				<TodoForm
					title={title}
					setTitle={setTitle}
					description={description}
					setDescription={setDescription}
					addTodo={addTodo}
				/>

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
					<TodoList
						todos={visibleTodos}
						toggleTodo={toggleTodo}
						removeTodo={removeTodo}
						toggleFavorite={toggleFavorite}
					/>
				)}
			</div>

			{toast && (
				<Toast
					key={toast.id}
					message={toast.message}
					type={toast.type}
					onClose={closeToast}
				/>
			)}
		</div>
	);
}

export default App;
