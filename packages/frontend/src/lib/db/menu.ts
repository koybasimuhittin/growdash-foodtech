import * as schema from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { getDatabase } from "./connection"

export async function getMenu(
	restaurantId: number
): Promise<schema.Menu | null> {
	const db = getDatabase()
	let records = await db
		.select()
		.from(schema.menu)
		.where(eq(schema.menu.restaurantId, restaurantId))
	if (records.length === 0) {
		return null
	}
	return records[0]
}

export async function createMenu(menu: schema.NewMenu): Promise<void> {
	const db = getDatabase()
	await db.insert(schema.menu).values(menu)
}

export async function insertMenuItem(
	menuItem: schema.NewMenuItem
): Promise<void> {
	const db = getDatabase()
	await db.insert(schema.menuItem).values(menuItem)
}

export async function updateMenuItem(
	id: number,
	name?: string,
	price?: number
): Promise<void> {
	const db = getDatabase()
	if (!name && !price) {
		return
	} else if (!name) {
		await db
			.update(schema.menuItem)
			.set({
				price: price!,
			})
			.where(eq(schema.menuItem.id, id))
	} else if (!price) {
		await db
			.update(schema.menuItem)
			.set({ name: name! })
			.where(eq(schema.menuItem.id, id))
	} else {
		await db
			.update(schema.menuItem)
			.set({ name: name!, price: price! })
			.where(eq(schema.menuItem.id, id))
	}
}
