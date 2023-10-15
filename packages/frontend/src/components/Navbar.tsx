"use client"

import { IRestaurantContext } from "@/types/restaurant"
import { useContext } from "react"
import { RestaurantContext } from "@/context/restaurantContext"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Navbar() {
	const { restaurant } = useContext(RestaurantContext) as IRestaurantContext
	const { slug } = useParams()

	return (
		<div className="fixed top-0 left-0 w-screen h-20 bg-gray-700 flex items-center justify-end p-4">
			<NavigationMenu>
				<NavigationMenuList>
					{slug === restaurant.slug ? (
						<>
							<NavigationMenuItem>
								<Link href={`/${restaurant.slug}`} legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Profile
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									href={`/${restaurant.slug}/schedule`}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Schedule
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</>
					) : (
						<>
							<NavigationMenuItem>
								<Link href="/login" legacyBehavior passHref>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Login
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
