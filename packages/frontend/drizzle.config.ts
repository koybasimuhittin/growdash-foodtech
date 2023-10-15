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
		connectionString: `mysql://waio8qrenhgb7rm4g4hq:pscale_pw_drM5EscEoqIypXxLU1XLLoDH5hWWHD6a6kT0frrbSI7@eu-central.connect.psdb.cloud/growdash-foodtech?ssl={"rejectUnauthorized":true}`,
	},
} satisfies Config
