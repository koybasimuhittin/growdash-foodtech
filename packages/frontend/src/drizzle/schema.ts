import {
	mysqlTable,
	serial,
	int,
	double,
	index,
	uniqueIndex,
	varchar,
	date,
} from "drizzle-orm/mysql-core"
import { type InferSelectModel } from "drizzle-orm"

export const restaurant = mysqlTable("restaurant", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull(),
})

export const discount = mysqlTable(
	"discount",
	{
		id: serial("id").primaryKey(),
		percentage: double("percentage").notNull(),
		startDate: int("start_date").notNull(),
		endDate: int("end_date").notNull(),
		itemId: int("item_idx").notNull(),
		branchId: int("branch_idx").notNull(),
	},
	(discount) => ({
		discountIndex: uniqueIndex("discount_idx").on(discount.itemId),
		discountIndex2: index("discount_idx2").on(discount.branchId),
	})
)

export const menuItem = mysqlTable(
	"menu_item",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		price: double("price").notNull(),
		image: varchar("name", { length: 255 }).notNull(),
		menuId: int("menu_id").notNull(),
	},
	(menuItem) => ({
		menuItemIndex: uniqueIndex("menu_item_idx").on(menuItem.menuId),
	})
)

export const branch = mysqlTable(
	"branch",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		slug: varchar("slug", { length: 255 }).notNull(),
		restaurantId: int("restaurant_id").notNull(),
	},
	(branch) => ({
		branchIndex: index("branch_idx").on(branch.restaurantId),
	})
)

export const menu = mysqlTable(
	"menu",
	{
		id: serial("id").primaryKey(),
		restaurantId: int("restaurant_id").notNull(),
		createDate: date("create_date").notNull(),
		updateDate: date("update_date").notNull(),
	},
	(menu) => ({
		menuIndex: uniqueIndex("menu_idx").on(menu.restaurantId),
	})
)

export type Menu = InferSelectModel<typeof menu>
export type Branch = InferSelectModel<typeof branch>
export type MenuItem = InferSelectModel<typeof menuItem>
export type Discount = InferSelectModel<typeof discount>
export type Restaurant = InferSelectModel<typeof restaurant>

export type NewRestaurant = typeof restaurant.$inferInsert
export type NewDiscount = typeof discount.$inferInsert
export type NewMenuItem = typeof menuItem.$inferInsert
export type NewBranch = typeof branch.$inferInsert
export type NewMenu = typeof menu.$inferInsert
