"use client";
import { useEffect, useState, useContext } from "react";
import WorkoutDisplay from "./components/WorkoutDisplay";
import type { WorkoutData } from "./utils/types";
import { DayContext } from "./layout";
import { getFrenchDaysArray } from "./utils";

export default function ExercisePage() {
	const [data, setData] = useState<WorkoutData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const daysFr = getFrenchDaysArray();
	const { dayIndex } = useContext(DayContext);

	useEffect(() => {
		const files = ["/sports_json/top.json", "/sports_json/bottom.json", "/sports_json/center.json"];
		Promise.all(
			files.map((file) =>
				fetch(file).then((res) => {
					if (!res.ok) throw new Error(`Failed to load ${file}`);
					return res.json();
				})
			)
		)
			.then((jsons) => setData(jsons))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div className="p-8">Chargement…</div>;
	if (error) return <div className="p-8 text-red-600">Erreur : {error}</div>;
	if (!data.length) return null;

	const selectedDay = daysFr[dayIndex];

	return <WorkoutDisplay workouts={data} selectedDay={selectedDay} />;
}
