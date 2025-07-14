"use client";
import { useEffect, useState, useContext } from "react";
import WorkoutDisplay from "./components/WorkoutDisplay";
import type { WorkoutData } from "./types";
import { DayContext } from "./layout";
import { getFrenchDaysArray } from "./utils";
import { useRouter } from "next/navigation";

export default function Home() {
	const [data, setData] = useState<WorkoutData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const daysFr: string[] = getFrenchDaysArray();
	const { dayIndex } = useContext(DayContext);
	const router = useRouter();

	useEffect(() => {
		const files: string[] = ["/sports_json/top.json", "/sports_json/bottom.json", "/sports_json/center.json"];
		Promise.all(
			files.map((file) =>
				fetch(file).then((res: Response) => {
					if (!res.ok) throw new Error(`Failed to load ${file}`);
					return res.json();
				})
			)
		)
			.then((jsons: WorkoutData[]) => setData(jsons))
			.catch((err: Error) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div className="p-8">Chargement…</div>;
	if (error) return <div className="p-8 text-red-600">Erreur : {error}</div>;
	if (!data.length) return null;

	const selectedDay: string = daysFr[dayIndex];
	const hasWorkoutForDay: boolean = data.some((workout: WorkoutData) => {
		const whenList: string[] = workout.when.split(/,\s*/).map((d: string) => d.trim().toLowerCase());
		return whenList.includes(selectedDay.toLowerCase());
	});

	const handlePlay = (): void => {
		try {
			const filtered: WorkoutData[] = data.filter((workout: WorkoutData) => {
				const whenList: string[] = workout.when.split(/,\s*/).map((d: string) => d.trim().toLowerCase());
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
			{hasWorkoutForDay && (
				<div className="flex justify-center my-8">
					<button
						onClick={handlePlay}
						className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						aria-label="Commencer l'entraînement"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mr-2">
							<polygon points="5,3 19,12 5,21" />
						</svg>
						Commencer l&apos;entraînement
					</button>
				</div>
			)}
			<WorkoutDisplay workouts={data} selectedDay={selectedDay} />
		</>
	);
}
