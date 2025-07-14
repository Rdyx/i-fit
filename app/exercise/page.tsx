"use client";
import { useEffect, useState } from "react";
import Stopwatch from "../components/Stopwatch";
import WorkoutStep from "../components/WorkoutStep";
import type { WorkoutData, Exercise } from "../types";

export default function ExercisePage() {
	const [data, setData] = useState<WorkoutData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [stepIndex, setStepIndex] = useState<number>(0);

	useEffect(() => {
		try {
			const stored = localStorage.getItem("exerciseData");
			const storedDay = localStorage.getItem("selectedDay");
			if (stored && storedDay) {
				setData(JSON.parse(stored));
				setLoading(false);
			} else {
				setError("Aucune donnée d&apos;exercice sélectionnée. Veuillez retourner à l&apos;accueil et choisir un jour.");
				setLoading(false);
			}
		} catch (e) {
			setError("Impossible de charger les données d&apos;exercice.");
			setLoading(false);
			console.error("Error loading exercise data:", e);
		}
	}, []);

	if (loading) return <div className="p-8">Chargement…</div>;
	if (error) return <div className="p-8 text-red-600">Erreur : {error}</div>;
	if (!data.length) return <div className="p-8 text-gray-600">Aucune donnée d&apos;exercice à afficher.</div>;

	const getSearchLinks = (name: string) => ({
		youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`,
		google: `https://www.google.com/search?q=${encodeURIComponent(name)}`,
	});

	const warmupStep = data
		.flatMap((workout: WorkoutData) =>
			Array.isArray(workout.warmup) ? workout.warmup : typeof workout.warmup === "string" ? [workout.warmup] : []
		)
		.filter((ex, idx, arr) => ex && arr.indexOf(ex) === idx)
		.join(", ");

	const steps = [
		warmupStep
			? {
					name: warmupStep,
					isWarmup: true,
					description: undefined,
					duration: undefined,
					image: undefined,
					series: undefined,
					rounds: undefined,
					repetitions: undefined,
					alternative: undefined,
					durationSeconds: undefined,
					restSeconds: undefined,
					youtubeLink: undefined,
					googleLink: undefined,
			  }
			: null,
		...data.flatMap((workout: WorkoutData) => {
			const parentRounds = workout.rounds;
			return (
				Array.isArray(workout.exercises)
					? workout.exercises
					: typeof workout.exercises === "string"
					? [workout.exercises]
					: []
			).map((ex: Exercise) => {
				const series = ex.series ?? (ex as Partial<Exercise> & { rounds?: number }).rounds ?? parentRounds;
				const rounds = (ex as Partial<Exercise> & { rounds?: number }).rounds ?? parentRounds;
				const repetitions = ex.repetitions ?? undefined;
				const durationSeconds = (ex as Partial<Exercise> & { duration_seconds?: number }).duration_seconds ?? undefined;
				const restSeconds = ex.rest_seconds ?? undefined;
				return {
					name: ex.name ?? ex,
					description: (ex as Partial<Exercise> & { description?: string }).description,
					duration: (ex as Partial<Exercise> & { duration?: number }).duration,
					image: (ex as Partial<Exercise> & { image?: string }).image,
					series,
					rounds,
					repetitions,
					alternative: ex.alternative,
					durationSeconds,
					restSeconds,
					youtubeLink: getSearchLinks(ex.name ?? ex).youtube,
					googleLink: getSearchLinks(ex.name ?? ex).google,
					isWarmup: false,
				};
			});
		}),
	].filter(Boolean);

	const currentStep = steps[stepIndex];

	return (
		<div className="flex flex-col items-center gap-8 my-8">
			<div className="flex flex-col items-center w-full max-w-xl gap-4">
				<div className="flex items-center justify-center w-full gap-4 mb-2">
					<button
						onClick={() => setStepIndex((i) => Math.max(i - 1, 0))}
						disabled={stepIndex === 0}
						aria-label="Étape précédente"
						className="p-2 rounded-full bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-900 dark:via-blue-700 dark:to-blue-500 text-white shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<span className="sr-only">Étape précédente</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<span className="text-lg font-semibold text-center flex-1">
						Étape {stepIndex + 1} / {steps.length}
					</span>
					<button
						onClick={() => setStepIndex((i) => Math.min(i + 1, steps.length - 1))}
						disabled={stepIndex === steps.length - 1}
						aria-label="Étape suivante"
						className="p-2 rounded-full bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-900 dark:via-blue-700 dark:to-blue-500 text-white shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<span className="sr-only">Étape suivante</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
				{currentStep && (
					<div className="flex flex-col items-center w-full">
						{currentStep.isWarmup && <Stopwatch duration={300} />}
						<WorkoutStep
							name={currentStep.name}
							description={currentStep.description}
							duration={currentStep.duration}
							image={currentStep.image}
							series={currentStep.series}
							rounds={currentStep.rounds}
							repetitions={currentStep.repetitions}
							alternative={currentStep.alternative}
							durationSeconds={currentStep.durationSeconds}
							restSeconds={currentStep.restSeconds}
							youtubeLink={currentStep.youtubeLink}
							googleLink={currentStep.googleLink}
							isWarmup={currentStep.isWarmup}
							onNextStep={() => setStepIndex((i) => Math.min(i + 1, steps.length - 1))}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
