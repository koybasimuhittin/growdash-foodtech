"use client"

import { IRestaurantContext } from "@/types/restaurant"
import { useContext } from "react"
import { RestaurantContext } from "@/context/restaurantContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MENU } from "../../constants"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import slugify from "slugify"
import moment from "moment"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function RestaurantPage({
	params,
}: {
	params: { slug: string }
}) {
	const { restaurant } = useContext(RestaurantContext) as IRestaurantContext

	return (
		<div className="flex items-center justify-between pt-6 max-w-screen overflow-hidden mb-20">
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
						<div className="flex flex-col w-screen px-12 items-center gap-10 justify-end">
							{MENU.map((item, index) => {
								return (
									<Card className="relative w-2/3" key={index}>
										<CardHeader>
											<CardTitle>
												{item.name[0].toUpperCase() +
													item.name.slice(1, item.name.length)}
											</CardTitle>
											<div className="bg-red-400 w-12 h-12 rounded-full absolute -right-6 -top-6 text-white flex items-center justify-center">
												%{item.discount}
											</div>
										</CardHeader>
										<CardContent className="flex gap-6">
											{item.image ? (
												<Image
													src={item.image}
													alt={slugify(item.name)}
													width={320}
													height={320}
													className="w-80 h-48"
												/>
											) : (
												<Skeleton className="w-full h-48 w-80" />
											)}
											<div className="flex flex-col items-start justfiy-end gap-2 h-full">
												<span className="font-normal flex gap-1">
													Discount:
													<p className="font-bold">
														{item.extra === "vivibot"
															? "Managing by vivibot"
															: `Ends ${moment(item.extra).fromNow()}`}
													</p>
												</span>
												<span className="font-nomal flex flex-col gap-1">
													Description:
													<p className="font-bold">{item.description}</p>
												</span>
												<span className="font-nomal flex gap-1">
													Cost:
													<p className="font-bold">{item.price}₺</p>
												</span>
											</div>
										</CardContent>
										<CardFooter className="justify-between"></CardFooter>
									</Card>
								)
							})}
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="secondary" className="w-64 h-16 text-lg">
										See suggested revisions
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Suggested revisions</DialogTitle>
										<DialogDescription>
											{MENU.map((item, index) => {
												return (
													<div className="flex flex-col gap-6 mb-2" key={index}>
														{review(item).length > 0 && (
															<span className="flex flex-col">
																<p className="font-bold">
																	{item.name.toUpperCase()}:
																</p>
																{review(item).map((item, index) => {
																	return (
																		<p
																			className="font-normal"
																			key={item + index}
																		>
																			{item}
																		</p>
																	)
																})}
															</span>
														)}
													</div>
												)
											})}
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
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

const review = (item: (typeof MENU)[0]) => {
	let { name, description, price, image, discount } = item
	name = name.toLowerCase()
	let recommendations: string[] = []
	if (image === null) {
		recommendations.push(`Add an image of ${name}`)
	}
	if (description === null) {
		recommendations.push(`Add a description of ${name}`)
	} else if (description!.length < 20) {
		recommendations.push(`Add a longer description of ${name}`)
	}
	if (
		name.includes("combo") ||
		name.includes("special") ||
		name.includes("premium") ||
		name.includes("deluxe")
	) {
		recommendations.push(`Put this food to first page of menu`)
	}

	return recommendations
}
