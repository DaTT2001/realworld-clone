import { IArticle } from "../interfaces";
import { axiosClient } from "./config";

export async function getAllTagApi (): Promise<any> {
    const response = await axiosClient.get('tags');
    return response.data;
}
export async function getArticleByPage (page: number): Promise<{articles: IArticle[], articlesCount: number}> {
    const params = { limit: 10, offset: ( page - 1) * 10 };
    // const response = await axiosClient.get(`articles?limit=10&offset=${(page - 1)*10}`);
    const response = await axiosClient.get('articles', { params });
    return response.data;
}
export async function getArticleByTag (page: number, tag: string): Promise<{articles: IArticle[], articlesCount: number}> {
    const params = { limit: 10, tag: tag, offset: ( page - 1) * 10 };
    // const response = await axiosClient.get(`articles?tag=${tag}&limit=10&offset=${(page - 1)*10}`);
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
    const params = {author: author, offset: ( page - 1) * 10};
    const reponse = await axiosClient.get('articles', { params })
    return reponse.data;
}
export async function getFavoritedArticlesByAuthor(author: string, page: number, favorited: string): Promise<{articles: IArticle[], articlesCount: number}> {
    const params = {author: author, offset: ( page - 1) * 10, favorited: favorited};
    const reponse = await axiosClient.get('articles', { params })
    return reponse.data;
}