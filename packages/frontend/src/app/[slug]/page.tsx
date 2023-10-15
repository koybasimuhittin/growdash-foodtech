"use client"

import { IRestaurantContext } from "@/types/restaurant"
import { useContext } from "react"
import { RestaurantContext } from "@/context/restaurantContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MENU } from "../../constants"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import slugify from "slugify"
import moment from "moment"

export default function RestaurantPage({
	params,
}: {
	params: { slug: string }
}) {
	const { restaurant } = useContext(RestaurantContext) as IRestaurantContext

	return (
		<div className="flex items-center justify-between pt-6 max-w-screen overflow-hidden">
			{restaurant.slug === params.slug ? (
				<Tabs defaultValue="menu" className="w-[400px]">
					<TabsList className="ml-12">
						<TabsTrigger value="menu">Menu</TabsTrigger>
						<TabsTrigger value="branches">Branches</TabsTrigger>
					</TabsList>
					<TabsContent value="menu" className="w-fit">
						<p className="ml-20 mt-4 mb-6 w-full text-lg font-bold">
							Review and update your menu from this section
						</p>
						<div className="grid md:grid-cols-4 grid-cols-2 w-screen px-12 items-center gap-10">
							{MENU.map((item, index) => {
								return (
									<Card className="relative" key={index}>
										<CardHeader>
											<CardTitle>
												{item.name[0].toUpperCase() +
													item.name.slice(1, item.name.length)}
											</CardTitle>
											<div className="bg-red-400 w-12 h-12 rounded-full absolute -right-6 -top-6 text-white flex items-center justify-center">
												%{item.discount}
											</div>
										</CardHeader>
										<CardContent>
											<Image
												src={item.image}
												alt={slugify(item.name)}
												width={400}
												height={400}
											/>
										</CardContent>
										<CardFooter className="justify-between">
											<p className="text-sm">
												{item.extra === "vivibot"
													? "Discount managing by vivibot"
													: `Discount ends ${moment(item.extra).fromNow()}`}
											</p>
											<p className="font-bold">{item.price}₺</p>
										</CardFooter>
									</Card>
								)
							})}
						</div>
					</TabsContent>
					<TabsContent value="branches">
						<p className="ml-20 mt-4 mb-6 w-full text-lg font-bold">
							Manage your branches from this section
						</p>
					</TabsContent>
				</Tabs>
			) : (
				<>InValid</>
			)}
		</div>
	)
}
