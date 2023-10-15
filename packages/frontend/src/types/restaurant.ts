import {
	MenuItem as MenuItemSchema,
	Discount as DiscountSchema,
	Menu as MenuSchema,
	Restaurant as RestaurantSchema,
	Branch as BranchSchema,
} from "@/drizzle/schema"

export type Restaurant = RestaurantSchema
export type Menu = MenuSchema & {
	items: { item: MenuItemSchema & { discount: DiscountSchema } }[] | null
}
export type Branch = BranchSchema

export interface IRestaurantContext {
	restaurant: Restaurant
	menu: Menu
	branches: Branch[] | null
	setRestaurant: React.Dispatch<React.SetStateAction<Restaurant>>
	authRestaurant: (restaurant: Restaurant) => void
}

export type { MenuItemSchema as MenuItem, DiscountSchema as Discount }
