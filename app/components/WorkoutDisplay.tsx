import type { WorkoutData } from "../types";
import ExercisesTable from "./ExercisesTable";

interface WorkoutDisplayProps {
	workouts: WorkoutData[];
	selectedDay: string;
}

export default function WorkoutDisplay({ workouts, selectedDay }: WorkoutDisplayProps) {
	// Combine all warmups for the selected day (optional: could deduplicate)
	const warmups = workouts
		.filter((workout) => {
			const whenList = workout.when.split(/,\s*/).map((d) => d.trim().toLowerCase());
			return whenList.includes(selectedDay.toLowerCase()) && workout.warmup && workout.warmup.length > 0;
		})
		.flatMap((workout) => workout.warmup);

	// Combine all exercises for the selected day, adding workoutName
	const allExercisesForDay = workouts.flatMap((workout) => {
		const whenList = workout.when.split(/,\s*/).map((d) => d.trim().toLowerCase());
		if (!whenList.includes(selectedDay.toLowerCase())) return [];
		return workout.exercises.map((ex) => ({ ...ex, workoutName: workout.name, workoutRounds: workout.rounds }));
	});

	return (
		<main className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 gap-8">
			{warmups.length > 0 && (
				<>
					<h2 className="text-lg font-semibold mb-2">Échauffement</h2>
					<ul className="list-disc list-inside mb-4">
						{warmups.map((item, idx) => (
							<li key={idx}>{item}</li>
						))}
					</ul>
				</>
			)}
			<h2 className="text-lg font-semibold mb-2">Exercices</h2>
			{allExercisesForDay.length === 0 ? (
				<p className="text-lg text-gray-600 dark:text-gray-300 mt-8" role="status">
					Aucun exercice prévu pour ce jour.
				</p>
			) : (
				<ExercisesTable exercises={allExercisesForDay} />
			)}
		</main>
	);
}
