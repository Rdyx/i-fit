"use client";
import { useContext, useEffect, useState, useRef } from "react";
import { DayContext } from "../layout";
import { getFrenchDaysArray } from "../utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const daysFr = getFrenchDaysArray();

export default function Navbar() {
	const { dayIndex, setDayIndex } = useContext(DayContext);
	const pathname = usePathname();
	const router = useRouter();
	const isExercisePage = pathname.startsWith("/exercise");
	const [showMenu, setShowMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handlePrev = () => {
		setDayIndex((dayIndex + 6) % 7);
	};
	const handleNext = () => {
		setDayIndex((dayIndex + 1) % 7);
	};

	useEffect(() => {
		if (!showMenu) return;
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showMenu]);

	return (
		<header>
			<nav
				className="flex items-center justify-between h-16 px-4 sm:px-8 border-b border-black/[.08] dark:border-white/[.145] bg-background"
				role="navigation"
				aria-label="Main navigation"
			>
				<span
					className="text-lg font-bold tracking-tight select-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="Logo i-fit"
				>
					i-fit
				</span>
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
				<div className="relative">
					<button
						type="button"
						className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
						aria-label="Ouvrir le menu"
						aria-haspopup="true"
						aria-expanded={showMenu ? "true" : "false"}
						id="menu-button"
						onClick={() => setShowMenu((prev) => !prev)}
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
					{showMenu && (
						<div
							ref={menuRef}
							className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10"
							role="menu"
							aria-labelledby="menu-button"
						>
							<div className="px-4 py-2 flex items-center justify-between">
								<Link
									href="/"
									className="w-full text-left rounded-md hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-700 dark:text-blue-400 font-semibold"
									aria-label="Retour à l'accueil"
									onClick={(e) => {
										if (isExercisePage) {
											e.preventDefault();
											if (
												window.confirm(
													"Êtes-vous sûr de vouloir quitter la séance en cours et revenir à l&apos;accueil ?"
												)
											) {
												router.push("/");
											}
										}
									}}
								>
									Accueil
								</Link>
							</div>
							{!isExercisePage && (
								<div className="px-4 py-2 flex items-center justify-between">
									<button
										type="button"
										className="w-full text-left rounded-md hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
										onClick={() => {
											const todayIdx = new Date().getDay();
											setDayIndex(todayIdx);
											setShowMenu(false);
										}}
										aria-label="Sélectionner le jour réel"
									>
										Exercices du jour
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}
