import { z } from "zod"

const PublicConfig = z.object({
	NEXT_PUBLIC_FRONTEND_BASE_URL: z.string().url(),
	NEXT_PUBLIC_DATABASE_URL: z.string().url(),
})

const ServerConfig = z.object({})

const isServer = typeof window === "undefined"
let publicConfig: z.infer<typeof PublicConfig>
let serverConfig: z.infer<typeof ServerConfig>

publicConfig = PublicConfig.parse({
	NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL!,
	NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
})

serverConfig = ServerConfig.parse({})

export { isServer, publicConfig, serverConfig }
