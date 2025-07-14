import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "./utils/constants";

// This is the not found page that will be displayed for 404 errors (URL not found).
export default function NotFoundPage() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
			<main
				className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"
				role="main"
				aria-label="Not found page main content"
			>
				<Image
					className="dark:invert"
					src={`${BASE_URL}/globe.svg`}
					alt="Not found icon"
					width={64}
					height={64}
					priority
				/>
				<h1 className="text-3xl font-bold text-center sm:text-left" tabIndex={-1}>
					404 – Page Not Found
				</h1>
				<p className="text-base text-center sm:text-left max-w-md">
					Sorry, we couldn&apos;t find that page. It may have been moved or deleted.
				</p>
				<Link
					href="/"
					className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					aria-label="Go back to homepage"
				>
					Go Home
				</Link>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-muted-foreground">
				<span>&copy; {new Date().getFullYear()} i-fit</span>
			</footer>
		</div>
	);
}
