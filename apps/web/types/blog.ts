type BlogTranslation = {
    title: string;
    content?: string;
    slug: string;
    languages_code: string;
};

export type Blog = {
    id: string;
    translations: BlogTranslation[];

    cover: string;
    categories: {
        blog_category_id: {
            translations: {
                name: string;
            }[];
        };
    }[];
};
