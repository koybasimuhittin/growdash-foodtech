import { publicConfig } from "../../config"
import {
	PlanetScaleDatabase,
	drizzle,
} from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import { sql } from "drizzle-orm"

let db: PlanetScaleDatabase
let boostedDb: PlanetScaleDatabase

export function getDatabase() {
	if (!db) {
		console.log(publicConfig.NEXT_PUBLIC_DATABASE_URL)
		db = drizzle(
			connect({
				host: "aws.connect.psdb.cloud",
				username: "j0erhdbt9ocjfck5nd7o",
				password: "pscale_pw_GMOwqp2A1zPR82ZosidcWV7XzaDu2KCnSsIg0iRgPzi",
			})
		)
	}
	return db
}
