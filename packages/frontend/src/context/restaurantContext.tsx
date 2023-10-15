import {
	Branch,
	IRestaurantContext,
	Menu,
	Restaurant,
} from "@/types/restaurant"
import * as React from "react"

export const RestaurantContext = React.createContext<IRestaurantContext | null>(
	null
)

const RestaurantContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [restaurant, setRestaurant] = React.useState<Restaurant>({
		id: 0,
		slug: "",
		name: "",
	})
	const [branches, setBranches] = React.useState<Branch[]>()
	const [menu, setMenu] = React.useState<Menu>({
		id: 0,
		restaurantId: 0,
		createDate: new Date(),
		updateDate: new Date(),
		items: null,
	})

	const authRestaurant = (restaurant: Restaurant) => {
		setRestaurant(restaurant)
		window.localStorage.setItem("restaurant", JSON.stringify(restaurant))
	}

	React.useEffect(() => {
		setRestaurant(
			window.localStorage.getItem("restaurant")
				? JSON.parse(localStorage.getItem("restaurant") as string)
				: {
						name: "",
						slug: "",
						id: null,
				  }
		)
	}, [])

	return (
		<RestaurantContext.Provider
			value={{
				restaurant: restaurant,
				menu: menu,
				branches: branches || null,
				setRestaurant,
				authRestaurant,
			}}
		>
			{children}
		</RestaurantContext.Provider>
	)
}

export default RestaurantContextProvider
