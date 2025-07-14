"use client";
import { useEffect, useState, useContext } from "react";
import WorkoutDisplay from "../components/WorkoutDisplay";
import { DayContext } from "../layout";
import { getFrenchDaysArray } from "../utils";

export default function ExercisePage() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const daysFr = getFrenchDaysArray();
	const { dayIndex } = useContext(DayContext);

	useEffect(() => {
		try {
			const stored = localStorage.getItem("exerciseData");
			const storedDay = localStorage.getItem("selectedDay");
			if (stored && storedDay) {
				setData(JSON.parse(stored));
				setLoading(false);
			} else {
				setError("Aucune donnée d'exercice sélectionnée. Veuillez retourner à l'accueil et choisir un jour.");
				setLoading(false);
			}
		} catch (e) {
			setError("Impossible de charger les données d'exercice.");
			setLoading(false);
		}
	}, []);

	if (loading) return <div className="p-8">Chargement…</div>;
	if (error) return <div className="p-8 text-red-600">Erreur : {error}</div>;
	if (!data.length) return <div className="p-8 text-gray-600">Aucune donnée d'exercice à afficher.</div>;

	const selectedDay = localStorage.getItem("selectedDay") || daysFr[dayIndex];

	return <WorkoutDisplay workouts={data} selectedDay={selectedDay} />;
}
