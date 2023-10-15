import * as schema from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { getDatabase } from "./connection"
import { createMenu } from "./menu"

export async function createRestaurant(
	restaurant: schema.NewRestaurant
): Promise<schema.Restaurant> {
	const db = getDatabase()
	await db.insert(schema.restaurant).values(restaurant)
	const insertedRestaurant = (
		await db
			.select()
			.from(schema.restaurant)
			.where(eq(schema.restaurant.slug, restaurant.slug))
	)[0]
	await createMenu({
		restaurantId: insertedRestaurant.id,
		createDate: new Date(),
		updateDate: new Date(),
	})

	return insertedRestaurant
}

export async function getRestaurant(slug: string) {
	const db = getDatabase()
	const restaurant = (
		await db
			.select()
			.from(schema.restaurant)
			.where(eq(schema.restaurant.slug, slug))
	)[0]

	if (restaurant) {
		return restaurant
	} else {
		throw new Error("Restaurant not found")
	}
}
