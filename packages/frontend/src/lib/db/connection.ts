import { serverConfig } from "@/config"
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
		db = drizzle(connect({ url: serverConfig.DATABASE_URL }))
	}
	return db
}

// Using Planetscale boost to cache queries. Use this connection only for cached queries.
// https://planetscale.com/docs/concepts/how-to-use-planetscale-boost#option-1-separate-connection-for-cached-queries-recommended
export async function getBoostedDatabase() {
	if (!boostedDb) {
		boostedDb = drizzle(connect({ url: serverConfig.DATABASE_URL }))
		await boostedDb.execute(sql`SET @@boost_cached_queries = true;`)
	}
	return boostedDb
}
