"use client";
import Link from "next/link";
import { useContext } from "react";
import { DayContext } from "../layout";
import { getFrenchDaysArray } from "../utils";
import { usePathname } from "next/navigation";

const daysFr = getFrenchDaysArray();

export default function Navbar() {
	const { dayIndex, setDayIndex } = useContext(DayContext);
	const pathname = usePathname();
	const isExercisePage = pathname.startsWith("/exercise");

	const handlePrev = () => {
		setDayIndex((dayIndex + 6) % 7);
	};
	const handleNext = () => {
		setDayIndex((dayIndex + 1) % 7);
	};

	return (
		<header>
			<nav
				className="flex items-center justify-between h-16 px-4 sm:px-8 border-b border-black/[.08] dark:border-white/[.145] bg-background"
				role="navigation"
				aria-label="Main navigation"
			>
				<Link
					href="/"
					className="text-lg font-bold tracking-tight select-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					tabIndex={0}
					aria-label="Go to homepage"
				>
					i-fit
				</Link>
				<div className="flex items-center gap-2">
					{!isExercisePage ? (
						<>
							<button
								type="button"
								onClick={handlePrev}
								className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
								aria-label="Jour précédent"
							>
								&#x25C0;
							</button>
							<span className="font-mono text-base min-w-[90px] text-center select-none" aria-live="polite">
								{daysFr[dayIndex]}
							</span>
							<button
								type="button"
								onClick={handleNext}
								className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
								aria-label="Jour suivant"
							>
								&#x25B6;
							</button>
						</>
					) : (
						<span className="font-mono text-base min-w-[90px] text-center select-none" aria-live="polite">
							{daysFr[dayIndex]}
						</span>
					)}
				</div>
				<button
					type="button"
					className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
					aria-label="Open menu"
				>
					<svg
						width="28"
						height="28"
						viewBox="0 0 28 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						focusable="false"
					>
						<rect y="6" width="28" height="2.5" rx="1.25" fill="currentColor" />
						<rect y="13" width="28" height="2.5" rx="1.25" fill="currentColor" />
						<rect y="20" width="28" height="2.5" rx="1.25" fill="currentColor" />
					</svg>
				</button>
			</nav>
		</header>
	);
}
