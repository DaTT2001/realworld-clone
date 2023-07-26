export interface IArticle {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}
export interface Author {
    username: string;
    bio: string | null;
    image: string;
    following: boolean;
}