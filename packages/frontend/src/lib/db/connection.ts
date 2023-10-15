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
				username: "k46k6m05f4l6o212vf41",
				password: "pscale_pw_rsIntBiaOzix0HgNV9mQqgAvUU05dBxpEbqE8ZK7Tpf",
			})
		)
	}
	return db
}
