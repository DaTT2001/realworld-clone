import { Author, IArticle, IState } from "./interfaces";

export const ARTICLE_DEFAULT: IArticle = {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
        username: '',
        bio: null,
        image: '',
        following: false,
    }
}
export const AUTHOR_DEFAULT: Author = {
    username: '',
    bio: null,
    image: '',
    following: false,
}
export const DEFAULT_STATE: IState = {
    user: {
        username: '',
        bio: null,
        image: '',
        password: '',
        email: '',
    },
    isLogged: false
}