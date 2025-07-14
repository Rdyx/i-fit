import React, { useState, useEffect } from "react";
import Stopwatch from "./Stopwatch";

/**
 * WorkoutStep component displays a single exercise step with details and controls.
 * @param {object} props
 * @param {string} props.name - Name of the exercise
 * @param {string} [props.description] - Description or instructions
 * @param {number} [props.duration] - Duration in seconds
 * @param {string} [props.image] - Optional image URL
 * @param {number|string} [props.series] - Number of series
 * @param {number|string} [props.rounds] - Number of rounds
 * @param {number|string} [props.repetitions] - Number of repetitions
 * @param {string} [props.alternative] - Alternative exercise
 * @param {number} [props.durationSeconds] - Duration in seconds for stopwatch
 * @param {number} [props.restSeconds] - Rest duration in seconds
 * @param {string} [props.restLabel] - Label for rest stopwatch
 * @param {string} [props.youtubeLink] - YouTube search link
 * @param {string} [props.googleLink] - Google search link
 * @param {boolean} [props.isWarmup] - Is this the warmup step
 * @returns {JSX.Element}
 * @author GitHub Copilot
 */
const WorkoutStep = ({
	name,
	description,
	duration,
	image,
	series,
	rounds,
	repetitions,
	alternative,
	durationSeconds,
	restSeconds,
	restLabel,
	youtubeLink,
	googleLink,
	isWarmup,
}: {
	name: string;
	description?: string;
	duration?: number;
	image?: string;
	series?: number | string;
	rounds?: number | string;
	repetitions?: number | string;
	alternative?: string;
	durationSeconds?: number;
	restSeconds?: number;
	restLabel?: string;
	youtubeLink?: string;
	googleLink?: string;
	isWarmup?: boolean;
}) => {
	// Reset series/rounds and timers when step changes
	const [currentSeries, setCurrentSeries] = useState(Number(series ?? rounds) || 1);
	useEffect(() => {
		setCurrentSeries(Number(series ?? rounds) || 1);
	}, [name, series, rounds]);

	// Always show repetitions if available
	const showRepetitions = typeof repetitions !== "undefined" && repetitions !== null;

	// Stopwatch keys to force reset on step change
	const stepKey = `${name}-${series ?? rounds}-${repetitions ?? ""}`;

	const handleRestEnd = () => {
		if (currentSeries > 1) setCurrentSeries((s) => s - 1);
	};

	return (
		<article
			className="flex flex-col md:flex-row items-center gap-4 p-4 my-4 bg-white dark:bg-gray-900 rounded-lg shadow"
			aria-label={`Exercice: ${name}`}
		>
			{image && (
				<img
					src={image}
					alt={`Illustration de l'exercice ${name}`}
					className="w-24 h-24 object-contain rounded"
					loading="lazy"
					aria-label={`Image de l'exercice ${name}`}
				/>
			)}
			<div className="flex-1 flex flex-col items-center justify-center">
				<h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-1 text-center">{name}</h3>
				{description && <p className="text-base text-gray-700 dark:text-gray-300 mb-1 text-center">{description}</p>}
				<div className="flex flex-wrap justify-center items-center gap-2 mb-2 w-full">
					{typeof duration === "number" && (
						<span
							className="inline-block px-2 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded"
							aria-label="Durée de l'exercice"
						>
							{duration} sec
						</span>
					)}
					{(typeof series !== "undefined" || typeof rounds !== "undefined") && (
						<span
							className="inline-block px-2 py-1 text-sm font-medium bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded"
							aria-label="Séries/Rounds"
						>
							Séries/Rounds: {currentSeries}
						</span>
					)}
					{showRepetitions && (
						<span
							className="inline-block px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 rounded"
							aria-label="Répétitions"
						>
							Répétitions: {repetitions}
						</span>
					)}
					{alternative && (
						<span
							className="inline-block px-2 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 rounded"
							aria-label="Alternative"
						>
							Alternative: {alternative}
						</span>
					)}
				</div>
				{typeof durationSeconds === "number" && durationSeconds > 0 && (
					<div className="mt-2 w-full flex flex-col items-center">
						<div className="font-semibold text-blue-700 dark:text-blue-300 mb-1 text-center">
							{restLabel || "Durée"}
						</div>
						<Stopwatch key={stepKey + "-main"} duration={durationSeconds} />
					</div>
				)}
				{typeof restSeconds === "number" && restSeconds > 0 && (
					<div className="mt-2 w-full flex flex-col items-center">
						<div className="font-semibold text-blue-700 dark:text-blue-300 mb-1 text-center">
							{restLabel || "Repos"}
						</div>
						<Stopwatch key={stepKey + "-rest"} duration={restSeconds} onComplete={handleRestEnd} />
					</div>
				)}
				<div className="flex gap-2 mt-2 justify-center w-full">
					{!isWarmup && youtubeLink && (
						<a
							href={youtubeLink}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-3 py-1 text-sm font-medium bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded hover:underline"
							aria-label={`Voir ${name} sur YouTube`}
						>
							YouTube
						</a>
					)}
					{!isWarmup && googleLink && (
						<a
							href={googleLink}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded hover:underline"
							aria-label={`Rechercher ${name} sur Google`}
						>
							Google
						</a>
					)}
				</div>
			</div>
		</article>
	);
};

export default WorkoutStep;
