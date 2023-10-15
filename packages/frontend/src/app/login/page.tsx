"use client"

import * as React from "react"
import slugify from "slugify"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useContext } from "react"
import { RestaurantContext } from "@/context/restaurantContext"
import { IRestaurantContext } from "@/types/restaurant"
import { getRestaurant, createRestaurant } from "@/lib/db/restaurant"
import { useRouter } from "next/navigation"

export default function LoginPage() {
	const [loginOrSignup, setLoginOrSignUp] = useState<"login" | "signup">(
		"login"
	)
	const [loginInfo, setLoginInfo] = useState({
		name: "",
		password: "",
	})
	const router = useRouter()

	const { authRestaurant } = useContext(RestaurantContext) as IRestaurantContext

	const handleLoginClick = async () => {
		const restaurant = await getRestaurant(slugify(loginInfo.name))
		authRestaurant(restaurant)
		router.push(`/${restaurant.slug}`)
	}

	const handleSignUpClick = async () => {
		const restaurant = await createRestaurant({
			name: loginInfo.name,
			slug: slugify(loginInfo.name),
		})
		authRestaurant(restaurant)
		router.push(`/${restaurant.slug}`)
	}

	return (
		<div className="flex items-center justify-center h-screen">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>
						{loginOrSignup[0].toUpperCase() +
							loginOrSignup.slice(1, loginOrSignup.length)}{" "}
						to vividos
					</CardTitle>
					<CardDescription>
						{loginOrSignup === "login"
							? `Enter your restaurant's name and your password to access your vividash `
							: `Create your restaurant's account to use your vividash`}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Restaurant Name</Label>
							<Input
								id="name"
								placeholder="Name of your restaurant"
								onChange={(e) => {
									setLoginInfo({ ...loginInfo, name: e.target.value })
								}}
								required
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Password</Label>
							<Input
								id="name"
								placeholder="Your password"
								onChange={(e) => {
									setLoginInfo({ ...loginInfo, password: e.target.value })
								}}
								value={"*".repeat(loginInfo.password.length)}
								required
							/>
						</div>
						<div className="flex items-center justify-end">
							<Button
								variant="link"
								onClick={() => {
									setLoginOrSignUp(
										loginOrSignup === "login" ? "signup" : "login"
									)
								}}
							>
								{loginOrSignup === "login" ? "signup" : "login"}
							</Button>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						onClick={() => {
							if (loginOrSignup === "login") {
								handleLoginClick()
							} else {
								handleSignUpClick()
							}
						}}
					>
						{loginOrSignup.toLocaleUpperCase()}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
