// Utility functions for the i-fit app

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
