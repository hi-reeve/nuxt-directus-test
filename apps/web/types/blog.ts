type BlogTranslation = {
    title: string;
    content?: string;
};

export type Blog = {
    id: string;
    translations: BlogTranslation[];
    slug: string;
    cover: string;
};
