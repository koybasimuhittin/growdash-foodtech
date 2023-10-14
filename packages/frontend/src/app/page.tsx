"use client"

import { Scheduler } from "@aldabil/react-scheduler"
import { NewDiscountModal } from "@/components"
import { useState } from "react"

const CustomEvent = ({
	event,
}: {
	event: {
		event_id: string | number
		title: string
		start: Date
		end: Date
		editable?: boolean
		deletable?: boolean
		color?: string
	}
}) => {
	return <div className="w-full h-full bg-red-5">{event.title}</div>
}

type Discount = {
	id: string
	title: string
	start: Date
	end: Date
	deletable?: boolean
	color?: string
	type: "auto" | "manual"
}

export default function Home() {
	const [discounts, setDiscounts] = useState<Discount[]>([])

	return (
		<div className="bg-white w-screen h-full relative">
			<div className="h-20 w-screen bg-white fixed top-0 left-0 z-10 flex items-center justify-end pr-12">
				<NewDiscountModal />
			</div>
			<div className="mt-20 w-screen">
				<Scheduler
					stickyNavigation={true}
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
							title: discount.type,
							start: discount.start,
							end: discount.end,
							color: discount.color,
							deletable: discount.deletable,
						})),
					]}
					eventRenderer={({ event, ...props }) => <CustomEvent event={event} />}
				/>
			</div>
		</div>
	)
}
