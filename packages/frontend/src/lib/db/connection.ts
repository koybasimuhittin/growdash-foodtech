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
				username: "waio8qrenhgb7rm4g4hq",
				password: "pscale_pw_drM5EscEoqIypXxLU1XLLoDH5hWWHD6a6kT0frrbSI7",
			})
		)
	}
	return db
}

// Using Planetscale boost to cache queries. Use this connection only for cached queries.
// https://planetscale.com/docs/concepts/how-to-use-planetscale-boost#option-1-separate-connection-for-cached-queries-recommended
export async function getBoostedDatabase() {
	if (!boostedDb) {
		boostedDb = drizzle(
			connect({
				host: "aws.connect.psdb.cloud",
				username: "waio8qrenhgb7rm4g4hq",
				password: "pscale_pw_drM5EscEoqIypXxLU1XLLoDH5hWWHD6a6kT0frrbSI7",
			})
		)
		await boostedDb.execute(sql`SET @@boost_cached_queries = true;`)
	}
	return boostedDb
}
