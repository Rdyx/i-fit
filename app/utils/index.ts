// Utility functions for the i-fit app
import { ExerciseWithWorkoutAndRounds } from "./types";

/**
 * Returns the French day name for a given day index (0=Dimanche, 1=Lundi, ... 6=Samedi)
 * @param dayIndex - number (0-6)
 */
export function getFrenchDay(dayIndex: number): string {
	const daysFr = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
	return daysFr[dayIndex % 7];
}

/**
 * Returns the array of French day names (for use in navigation, etc)
 */
export function getFrenchDaysArray(): string[] {
	return ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
}

/**
 * Builds the rows for the DataGrid, adding an id property.
 */
export function buildExerciseRows(exercises: ExerciseWithWorkoutAndRounds[]): ExerciseWithWorkoutAndRounds[] {
	return exercises.map((ex, idx) => ({ id: idx, ...ex }));
}

/**
 * Handles column visibility model change for DataGrid.
 */
export function handleColumnVisibilityModelChange(
	setColumnVisibilityModel: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
) {
	return (model: { [key: string]: boolean }) => {
		setColumnVisibilityModel(model);
	};
}

/**
 * Custom row id function for DataGrid getRowId.
 * Uses a combination of workoutName, name, and index for uniqueness.
 */
export function getExerciseRowId(row: ExerciseWithWorkoutAndRounds): string {
	return `${row.workoutName ?? ""}-${row.name ?? ""}`;
}
