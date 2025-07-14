"use client";
import { useState, useRef, useEffect } from "react";

interface StopwatchProps {
	duration: number; // duration in seconds
	onComplete?: () => void; // optional callback when countdown reaches zero
}

/**
 * Stopwatch component with start, pause, reset controls, and onComplete callback.
 * @param duration Duration in seconds
 * @param onComplete Optional callback when countdown reaches zero
 */
export default function Stopwatch({ duration, onComplete }: StopwatchProps) {
	const [seconds, setSeconds] = useState(duration);
	const [running, setRunning] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setSeconds(duration);
	}, [duration]);

	useEffect(() => {
		if (running && seconds > 0) {
			intervalRef.current = setInterval(() => {
				setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
			}, 1000);
		} else if (!running && intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [running, seconds]);

	useEffect(() => {
		if (seconds === 0 && running) {
			setRunning(false);
			if (onComplete) onComplete();
		}
	}, [seconds, running, onComplete]);

	const handleStart = () => setRunning(true);
	const handlePause = () => setRunning(false);
	const handleReset = () => {
		setRunning(false);
		setSeconds(duration);
	};

	const minutes = Math.floor(seconds / 60);
	const secs = seconds % 60;

	return (
		<section
			className="flex flex-col items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow"
			aria-label="Chronomètre"
			role="timer"
		>
			<div className="text-3xl font-mono" aria-live="polite" aria-atomic="true">
				{minutes.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
			</div>
			<div className="flex gap-2">
				<button
					onClick={handleStart}
					disabled={running || seconds === 0}
					className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="Démarrer le chronomètre"
				>
					Démarrer
				</button>
				<button
					onClick={handlePause}
					disabled={!running}
					className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
					aria-label="Mettre en pause le chronomètre"
				>
					Pause
				</button>
				<button
					onClick={handleReset}
					className="px-4 py-2 rounded bg-gray-500 text-white font-semibold shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
					aria-label="Réinitialiser le chronomètre"
				>
					Réinitialiser
				</button>
			</div>
		</section>
	);
}
