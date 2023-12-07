import { eq } from "drizzle-orm";
import { blog } from "~/directus-drizzle/schema";

export default defineEventHandler(event => {
    const slug = getRouterParam(event, "slug");

    if (slug) {
        return directus.query.blog.findFirst({
            where: eq(blog.slug, slug),
        });
    }

    throw createError({
        statusCode: 404,
        message: "Not found",
    });
});
