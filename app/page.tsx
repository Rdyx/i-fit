"use client";
import { useEffect, useState, useContext } from "react";
import WorkoutDisplay from "./components/WorkoutDisplay";
import type { WorkoutData } from "./types";
import { DayContext } from "./layout";
import { getFrenchDaysArray } from "./utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Stopwatch from "./components/Stopwatch";

export default function Home() {
	const [data, setData] = useState<WorkoutData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const daysFr = getFrenchDaysArray();
	const { dayIndex } = useContext(DayContext);
	const router = useRouter();

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

	const handlePlay = () => {
		try {
			// Filter only full workout objects for the selected day
			const filtered = data.filter((workout) => {
				const whenList = workout.when.split(/,\s*/).map((d) => d.trim().toLowerCase());
				return whenList.includes(selectedDay.toLowerCase());
			});
			localStorage.setItem("exerciseData", JSON.stringify(filtered));
			localStorage.setItem("selectedDay", selectedDay);
			router.push("/exercise");
		} catch (e) {
			console.error("Failed to store exercise data", e);
		}
	};

	return (
		<>
			<div className="flex justify-center my-8">
				<Stopwatch duration={300} />
			</div>
			<div className="flex justify-center my-8">
				<button
					onClick={handlePlay}
					className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="Commencer l'entraînement"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mr-2">
						<polygon points="5,3 19,12 5,21" />
					</svg>
					Commencer l'entraînement
				</button>
			</div>
			<WorkoutDisplay workouts={data} selectedDay={selectedDay} />
		</>
	);
}
