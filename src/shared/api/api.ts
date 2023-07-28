import { IArticle, User } from "../interfaces";
import { axiosClient } from "./config";

export async function getAllTagApi (): Promise<any> {
    const response = await axiosClient.get('tags');
    return response.data;
}
export async function getArticleByPage (page: number): Promise<{articles: IArticle[], articlesCount: number}> {
    const params = { limit: 10, offset: ( page - 1) * 10 };
    const response = await axiosClient.get('articles', { params });
    return response.data;
}
export async function getArticleByTag (page: number, tag: string): Promise<{articles: IArticle[], articlesCount: number}> {
    const params = { limit: 10, tag: tag, offset: ( page - 1) * 10 };
    const response = await axiosClient.get('articles', { params });
    return response.data;
}
export async function getArticleDetail (url: string) : Promise<any> {
    const response = await axiosClient.get(url)
    return response.data;
}
export async function getProfile (url: string) : Promise<any> {
    const response = await axiosClient.get(url)
    return response.data;
}
export async function getArticlesByAuthor(author: string, page: number): Promise<{articles: IArticle[], articlesCount: number}> {
    const params = {limit: 10, author: author, offset: ( page - 1) * 10};
    const response = await axiosClient.get('articles', { params })
    return response.data;
}
export async function getFavoritedArticlesByAuthor(author: string, page: number): Promise<{articles: IArticle[], articlesCount: number}> {
    const params = {limit : 10, favorited: author, offset: ( page - 1) * 10};
    const response = await axiosClient.get('articles', { params })
    return response.data;
}
export async function loginApi(email: string, password: string): Promise<any> {
    const req = {
        user : {
            email: email,
            password: password
        }
    }
    const response = await axiosClient.post('users/login', req)
    return response.data;
}
export async function getCurrentUser(): Promise<any> {
    const response = await axiosClient.get('user')
    return response.data;
}
export async function updateCurrentUser(email: string, password: string, username: string, bio: string | null, image: string): Promise<any> {
    const req = {
        user: {
            email: email,
            password: password,
            username: username,
            bio: bio,
            image: image
        }
    }
    const response = await axiosClient.put('user', req)
    return response.data;
}
export async function registerApi(email: string, password: string, username: string): Promise<any> {
    const req = {
        user: {
            email: email,
            password: password,
            username: username
        }
    }
    const response = await axiosClient.post('users', req)
    return response.data;
}
export async function favoriteArticle(slug: string): Promise<any> {
    const response = await axiosClient.post(`articles/${slug}/favorite`)
    return response.data;
}
export async function unFavoriteArticle(slug: string): Promise<any> {
    const response = await axiosClient.delete(`articles/${slug}/favorite`)
    return response.data;
}
export async function getAllComment(slug: string): Promise<any> {
    const response = await axiosClient.get(`${slug}/comments`)
    return response.data;
}
export async function postComment(slug: string, comment: string): Promise<any> {
    const req = {
        comment : {
            body: comment
        }
    }
    const response = await axiosClient.post(`${slug}/comments`, req)
    return response.data;
}
export async function deleteComment(slug: string, id: number): Promise<any> {
    const response = await axiosClient.delete(`${slug}/comments/${id}`)
    return response.data;
}
