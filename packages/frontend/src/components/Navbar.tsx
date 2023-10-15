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
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Navbar() {
	const { restaurant } = useContext(RestaurantContext) as IRestaurantContext
	const { slug } = useParams()
	const router = useRouter()

	return (
		<div className="fixed top-0 left-0 w-screen flex items-center justify-between h-20 bg-white p-12 z-10">
			<Image
				src="/vivid_logo.png"
				alt="logo"
				width={170}
				height={30}
				onClick={() => {
					router.push("/")
				}}
				className="cursor-pointer"
			/>
			<div className="flex items-center justify-end">
				<NavigationMenu>
					<NavigationMenuList>
						{slug === restaurant.slug ? (
							<>
								<NavigationMenuItem className="text-xl">
									<Link href={`/${restaurant.slug}`} legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
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
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											Schedule
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</>
						) : (
							<>
								<NavigationMenuItem>
									<Link href="/login" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											Login
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</>
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	)
}
