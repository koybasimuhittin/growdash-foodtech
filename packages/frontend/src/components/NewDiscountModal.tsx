"use client"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MENU } from "@/constants"
import slugify from "slugify"

function ItemList({
	pickedItems,
	setPickedItems,
	items,
}: {
	pickedItems: Number[]
	setPickedItems: React.Dispatch<React.SetStateAction<Number[]>>
	items: (typeof MENU)[0][]
}) {
	useEffect(() => {
		console.log(pickedItems)
	}, [pickedItems])
	return (
		<div className="flex flex-col mt-8">
			<p className="text-[16px]">Pick the items that will be managed</p>
			<div className="grid grid-cols-3 items-center justify-center p-6 gap-3">
				{items.map((item, index) => {
					return (
						<div className="flex items-center flex-col" key={index}>
							<Avatar
								onClick={() => {
									if (pickedItems.includes(index)) {
										setPickedItems(
											pickedItems.filter((val) => {
												return val != index
											})
										)
									} else {
										setPickedItems([...pickedItems, index])
									}
								}}
								className={cn(
									pickedItems.includes(index)
										? "border-[4px] border-red-300"
										: "border-0",
									"hover:bg-red-400 hover:border-2 cursor-pointer"
								)}
							>
								<AvatarImage src={item.image!} alt={slugify(item.name)} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<p>{item.name}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default function NewDiscountModal() {
	const [modalStep, setModalStep] = useState<number>(0)
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 1),
	})
	const [pickedItems, setPickedItems] = useState<Number[]>([])

	const steps = [
		{
			title: "Choose discount method",
			description: (
				<div className="flex flex-col gap-6">
					<Button
						onClick={() => setModalStep(1)}
						className="h-fit"
						variant={"outline"}
					>
						<div className="flex flex-col items-start justify-center p-2">
							<div className="text-lg">Manuel Discount</div>
							<div className="text-left">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Pellentesque facilisis non metus vitae eleifend. Maecenas ut
								cursus massa.
							</div>
						</div>
					</Button>
					<Button
						onClick={() => setModalStep(2)}
						className="h-fit"
						variant={"outline"}
					>
						<div className="flex flex-col items-start justify-center p-2">
							<div className="text-lg">Auto Discount</div>
							<div className="text-left">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Pellentesque facilisis non metus vitae eleifend. Maecenas ut
								cursus massa.
							</div>
						</div>
					</Button>
				</div>
			),
		},
		{
			title: "Manuel Discount",
			description: <div></div>,
		},
		{
			title: "Auto Discount",
			description: (
				<div className="flex flex-col">
					<div className="flex flex-col gap-2">
						<p className="text-[16px]">
							Pick a date range that will be managed
						</p>
						<div className={cn("grid gap-2")}>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										id="date"
										variant={"outline"}
										className={cn(
											"w-[300px] justify-start text-left font-normal",
											!date && "text-muted-foreground"
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date?.from ? (
											date.to ? (
												<>
													{format(date.from, "LLL dd, y")} -{" "}
													{format(date.to, "LLL dd, y")}
												</>
											) : (
												format(date.from, "LLL dd, y")
											)
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										initialFocus
										mode="range"
										defaultMonth={date?.from}
										selected={date}
										onSelect={setDate}
										numberOfMonths={2}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<ItemList
						items={MENU}
						pickedItems={pickedItems}
						setPickedItems={setPickedItems}
					/>
					<div className="flex items-center justify-end w-full">
						<Button onClick={async () => {}}>Launch</Button>
					</div>
				</div>
			),
		},
	]

	return (
		<Dialog
			onOpenChange={() => {
				setModalStep(0)
			}}
		>
			<DialogTrigger asChild>
				<Button className="bg-[#5e3061ff] hover:bg-[#734079ff] w-48 h-12 text-lg">
					+Add Discount
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{steps[modalStep].title}</DialogTitle>
					<br />
					<DialogDescription>{steps[modalStep].description}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
