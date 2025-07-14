"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./layout/Navbar";
import { createContext, useState } from "react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const DayContext = createContext<{
	dayIndex: number;
	setDayIndex: (idx: number) => void;
}>({
	dayIndex: new Date().getDay(),
	setDayIndex: () => {},
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [dayIndex, setDayIndex] = useState<number>(new Date().getDay());
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<DayContext.Provider value={{ dayIndex, setDayIndex }}>
					<div key="navbar" className="sticky-navbar">
						<Navbar />
					</div>
					<div key="children">{children}</div>
				</DayContext.Provider>
			</body>
		</html>
	);
}
