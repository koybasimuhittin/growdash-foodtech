"use client"

import { IRestaurantContext } from "@/types/restaurant"
import { useContext, useEffect } from "react"
import { RestaurantContext } from "@/context/restaurantContext"

import { Scheduler } from "@aldabil/react-scheduler"
import { NewDiscountModal } from "@/components"
import { useState } from "react"
import { addDays, addHours } from "date-fns"
import { cn } from "@/lib/utils"

type Discount = {
	id: string
	title: string
	start: Date
	end: Date
	deletable?: boolean
	color?: string
	type: string
}

const DISCOUNTS = [
	{
		id: "1",
		title: "ViviBot",
		start: addHours(new Date(), 1),
		end: addHours(new Date(), 4),
		type: "auto",
		color: "#427ef5",
	},
	{
		id: "2",
		title: "ViviBot",
		start: addHours(addDays(new Date(), -1), -10),
		end: addHours(addDays(new Date(), 2), 2),
		type: "auto",
		color: "#427ef5",
	},
	{
		id: "3",
		title: "ViviBot",
		start: addHours(addDays(new Date(), -1), -6),
		end: addHours(addDays(new Date(), 1), 2),
		type: "auto",
		color: "#427ef5",
	},
	{
		id: "4",
		title: "ViviBot",
		start: addHours(new Date(), -7),
		end: addHours(new Date(), -2),
		type: "auto",
		color: "#427ef5",
	},
	{
		id: "5",
		title: "Manual Discount",
		start: addHours(new Date(), 17),
		end: addHours(new Date(), 20),
		type: "manual",
		color: "#f56042",
	},
	{
		id: "6",
		title: "Manual Discount",
		start: addHours(new Date(), 5),
		end: addHours(new Date(), 7),
		type: "manual",
		color: "#f56042",
	},
	{
		id: "7",
		title: "Manual Discount",
		start: addHours(new Date(), -7),
		end: addHours(new Date(), -4),
		type: "manual",
		color: "#f56042",
	},
	{
		id: "8",
		title: "Manual Discount",
		start: addHours(new Date(), 29),
		end: addHours(new Date(), 31),
		type: "manual",
		color: "#f56042",
	},
	{
		id: "9",
		title: "Manual Discount",
		start: addHours(new Date(), 41),
		end: addHours(new Date(), 65),
		type: "manual",
		color: "#f56042",
	},
]

export default function SchedulePage({ params }: { params: { slug: string } }) {
	const { restaurant } = useContext(RestaurantContext) as IRestaurantContext

	const [discounts, setDiscounts] = useState<Discount[]>(DISCOUNTS)

	return (
		<div className="bg-white w-screen h-full relative">
			<div className="h-20 w-screen bg-white fixed top-20 left-0 z-10 flex items-center justify-end pr-12">
				<NewDiscountModal />
			</div>
			<div className="w-screen absolute -z-10 top-20">
				<Scheduler
					stickyNavitation={true}
					navigation={true}
					resourceViewMode="default"
					hourFormat="24"
					view="week"
					day={null}
					month={null}
					week={{
						weekDays: [0, 1, 2, 3, 4, 5],
						weekStartOn: 6,
						startHour: 0,
						endHour: 24,
						step: 60,
						navigation: true,
						disableGoToDay: false,
					}}
					height={120}
					editable={false}
					deletable={true}
					draggable={false}
					events={[
						...discounts.map((discount) => ({
							event_id: discount.id,
							title: discount.title,
							start: discount.start,
							end: discount.end,
							deletable: discount.deletable,
							color: discount.color,
						})),
					]}
				/>
			</div>
		</div>
	)
}
