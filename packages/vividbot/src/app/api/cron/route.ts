import { NextResponse } from "next/server"
import dummySales from "../../../../dummy/sale.json"
import axios from "axios"

export async function GET() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_FRONTEND_BASE}/api/discounts`
		)

		if (response.ok) {
			const discountArray: Number[] = []
			const discounts = await response.json()
			for (let i = 0; i < dummySales.length; i++) {
				let avarage = 0
				let divider = 0
				for (let j = 0; j < dummySales[i].length; j++) {
					for (let k = 0; k < dummySales[i][j].length; k++) {
						avarage += dummySales[i][j][k]
						divider++
					}
				}
				avarage = avarage / divider
				const discount = avarage - discounts[i].price
				const discountPercent = (discount / avarage) * 100
				if (discountPercent > 0) {
					discountArray[i] = discount
				}

				await axios.post(
					`${process.env.NEXT_PUBLIC_FRONTEND_BASE}/api/discounts`,
					{
						discount: discountArray[i],
						id: i,
					}
				)
			}
		} else {
			return NextResponse.json(
				{ error: "Failed to update discounts" },
				{ status: 500 }
			)
		}
	} catch (error) {
		console.error("Error on updating discounts:", error)
		return NextResponse.json(
			{ error: "Failed to update discounts" },
			{ status: 500 }
		)
	}
}
