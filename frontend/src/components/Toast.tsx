import { useEffect, useState } from "react";
import { IconAlertCircleFilled, IconCircleCheckFilled, IconX } from "@tabler/icons-react";

export type ToastType = "success" | "error";

interface ToastProps {
	message: string;
	type: ToastType;
	onClose: () => void;
	duration?: number;
}

const ANIMATION_MS = 200;

export const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const showTimer = setTimeout(() => setVisible(true), 10);
		const hideTimer = setTimeout(() => setVisible(false), duration);
		const closeTimer = setTimeout(onClose, duration + ANIMATION_MS);

		return () => {
			clearTimeout(showTimer);
			clearTimeout(hideTimer);
			clearTimeout(closeTimer);
		};
	}, [duration, onClose]);

	const isError = type === "error";

	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center px-4">
			<div
				role={isError ? "alert" : "status"}
				className={`pointer-events-auto flex items-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-white shadow-lg transition-all duration-200 ${
					visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
				}`}
			>
				{isError ? (
					<IconAlertCircleFilled className="h-5 w-5 shrink-0 text-red-400" />
				) : (
					<IconCircleCheckFilled className="h-5 w-5 shrink-0 text-green-400" />
				)}

				<span className="text-sm">{message}</span>

				<button
					type="button"
					onClick={onClose}
					aria-label="Close notification"
					className="ml-2 rounded p-1 text-gray-400 transition hover:text-white cursor-pointer"
				>
					<IconX className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}