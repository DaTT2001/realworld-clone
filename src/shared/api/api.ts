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
export async function getFeedArticles(author: string, page: number): Promise<{articles: IArticle[], articlesCount: number}> {
    const params = {limit: 10, offset: ( page - 1) * 10};
    const response = await axiosClient.get('articles/feed', { params })
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
export async function postNewArticle(title: string, description: string, body: string, tagList: string[]): Promise<any> {
    const req = {
        article : {
            title : title,
            description : description,
            body : body,
            tagList : tagList
        }
    }
    const response = await axiosClient.post('articles', req)
    return response.data
}
export async function editArticle(title: string, description: string, body: string, tagList: string[], slug: string): Promise<any> {
    const req = {
        article : {
            title : title,
            description : description,
            body : body,
            tagList : tagList
        }
    }
    const response = await axiosClient.put(`articles/${slug}`, req)
    return response.data
}
export async function deleteArticle(slug: string): Promise<any> {
    const response = await axiosClient.delete(`articles/${slug}`)
    return response.data
}
export async function followProfile(username: string): Promise<any> {
    const response = await axiosClient.post(`profiles/${username}/follow`)
    return response.data
}
export async function unFollowProfile(username: string): Promise<any> {
    const response = await axiosClient.delete(`profiles/${username}/follow`)
    return response.data
}
// export async function getProfiles(username: string): Promise<any> {

//     const response = await axiosClient.get(`profiles/celeb_${username}`)
//     return response.data
// }