import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/directus-drizzle/schema";
import postgres from "postgres";
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const client = postgres(config.dbConnectionString);
    const directus = drizzle(client, {
        schema,
    });
    return {
        provide: {
            directus,
        },
    };
});
