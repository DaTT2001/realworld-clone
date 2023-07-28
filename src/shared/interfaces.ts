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
export interface User {
    username: string;
    bio: string | null;
    image: string;
    email: string;
    password: string
}
export interface IState {
    user: User
    isLogged: boolean
}
export interface IComment {
    author: {
        bio: null | string
        following: boolean
        image: string
        username: string
    }
    body: string
    createdAt: string
    id: number
    updateAt: string
}