import { IArticlePreview } from "../interfaces";
import { axiosClient } from "./config";

export async function getAllTagApi (): Promise<any> {
    const response = await axiosClient.get('tags');
    return response.data;
}
export async function getArticleByPage (page: number): Promise<{articles: IArticlePreview[], articlesCount: number}> {
    const response = await axiosClient.get(`articles?limit=10&offset=${(page - 1)*10}`);
    return response.data;
}
export async function getArticleByTag (page: number, tag: string): Promise<{articles: IArticlePreview[], articlesCount: number}> {
    const response = await axiosClient.get(`articles?tag=${tag}&limit=10&offset=${(page - 1)*10}`);
    return response.data;
}