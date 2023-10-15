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
				host: publicConfig.NEXT_PUBLIC_DB_HOST,
				username: publicConfig.NEXT_PUBLIC_DB_USERNAME,
				password: publicConfig.NEXT_PUBLIC_DB_PASSWORD,
			})
		)
	}
	return db
}
