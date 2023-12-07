import { directus } from "@/server/utils/directus";

export default defineEventHandler(() => {
    console.log(directus.query.blog.findMany());
    // return $directus.query.blog.findMany();
    return directus.query.blog.findMany({});
});
