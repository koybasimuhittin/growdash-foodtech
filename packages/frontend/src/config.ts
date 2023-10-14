import { z } from "zod"

const PublicConfig = z.object({
	NEXT_PUBLIC_FRONTEND_BASE_URL: z.string().url(),
})

const ServerConfig = z.object({
	// Postgresql database url provided by Planetscale
	// Do not to use the production DATABASE_URL for development
	DATABASE_URL: z.string().url(),
})

const isServer = typeof window === "undefined"
let publicConfig: z.infer<typeof PublicConfig>
let serverConfig: z.infer<typeof ServerConfig>

publicConfig = PublicConfig.parse({
	NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL!,
})

if (isServer) {
	serverConfig = ServerConfig.parse({
		DATABASE_URL: process.env.DATABASE_URL!,
	})
}

export { isServer, publicConfig, serverConfig }
