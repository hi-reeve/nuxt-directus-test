import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/directus-drizzle/schema";
import postgres from "postgres";

const client = postgres(process.env.DIRECTUS_DIRECT_URL as string);
export const directus = drizzle(client, {
    schema,
});
