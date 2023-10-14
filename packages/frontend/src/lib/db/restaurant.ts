import * as schema from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { getDatabase } from "./connection"
import { createMenu } from "./menu"

export async function createRestaurant(
	restaurant: schema.NewRestaurant
): Promise<void> {
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
		createDate: Math.floor(Date.now() / 1000),
		updateDate: Math.floor(Date.now() / 1000),
	})
}
