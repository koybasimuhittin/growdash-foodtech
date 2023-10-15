import { Button } from "@/components/ui/button"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import ContextProvider from "../context/provider"
import { Navbar } from "@/components"

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Vividos",
	description: "Price fixing tool by Vividos",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/png" sizes="16x16" href="/logo_v3.png" />
			</head>
			<body className={poppins.className + "relative mt-20 bg-white"}>
				<ContextProvider>
					<Navbar />
					{children}
				</ContextProvider>
			</body>
		</html>
	)
}
