import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

// Load environment variables from .env
dotenv.config();

// Validate presence of the required DIRECTUS_DIRECT_URL environment variable
if (!process.env.DIRECTUS_DIRECT_URL) {
    throw new Error("DIRECTUS_DIRECT_URL is missing");
}

console.log("DIRECTUS_DIRECT_URL", process.env.DIRECTUS_DIRECT_URL);

// Export the configuration for Drizzle ORM
export default {
    out: "./directus-drizzle",
    dbCredentials: {
        connectionString: process.env.DIRECTUS_DIRECT_URL,
    },
    driver: "pg",
} satisfies Config;
