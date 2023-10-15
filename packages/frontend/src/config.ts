import { z } from "zod"

const PublicConfig = z.object({
	NEXT_PUBLIC_FRONTEND_BASE_URL: z.string().url(),
	NEXT_PUBLIC_DATABASE_URL: z.string().url(),
	NEXT_PUBLIC_DB_HOST: z.string(),
	NEXT_PUBLIC_DB_USERNAME: z.string(),
	NEXT_PUBLIC_DB_PASSWORD: z.string(),
	NEXT_PUBLIC_NODE_ENV: z.string(),
})

const ServerConfig = z.object({})

const isServer = typeof window === "undefined"
let publicConfig: z.infer<typeof PublicConfig>
let serverConfig: z.infer<typeof ServerConfig>

publicConfig = PublicConfig.parse({
	NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV!,
	NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL!,
	NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
	NEXT_PUBLIC_DB_HOST: process.env.NEXT_PUBLIC_DB_HOST!,
	NEXT_PUBLIC_DB_USERNAME: process.env.NEXT_PUBLIC_DB_USERNAME!,
	NEXT_PUBLIC_DB_PASSWORD: process.env.NEXT_PUBLIC_DB_PASSWORD!,
})

serverConfig = ServerConfig.parse({})

export { isServer, publicConfig, serverConfig }
