import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({
	path: ".env",
})

export default {
	schema: "./src/drizzle/schema.ts",
	out: "./src/drizzle/migrations",
	driver: "mysql2",
	dbCredentials: {
		connectionString: `mysql://yfl8419okds1osy6fd5r:pscale_pw_49qW9XoiPQh8bX1EHNrllJ8JrDmcTtSIWxkCU6Ei68y@aws.connect.psdb.cloud/growdash-foodtech?ssl={"rejectUnauthorized":true}`,
	},
} satisfies Config
