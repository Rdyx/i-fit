export interface Exercise {
	name: string;
	series: number;
	repetitions: string;
	rest_seconds: number;
	alternative: string;
}

export interface WorkoutData {
	name: string;
	duration_minutes: number;
	frequency_per_week: number;
	type: string;
	rounds: number;
	when: string;
	warmup: string[];
	exercises: Exercise[];
}

export interface ExercisesTableProps {
	exercises: ExerciseWithWorkoutAndRounds[];
}

export type ExerciseWithWorkout = Exercise & { workoutName: string };
export interface ExerciseWithWorkoutAndRounds extends ExerciseWithWorkout {
	workoutRounds?: number;
}
