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
		connectionString: process.env.DATABASE_URL!,
	},
} satisfies Config
