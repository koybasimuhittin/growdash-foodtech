"use client"
import RestaurantContextProvider from "./restaurantContext"
import { Toaster } from "@/components/ui/toaster"

export default function ContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<RestaurantContextProvider>
			{children}
			<Toaster />
		</RestaurantContextProvider>
	)
}
