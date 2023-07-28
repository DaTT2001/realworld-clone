import { Action } from "./Context"

export const setUser = (payload: {email: string, password: string, username: string, bio: string | null, image: string}): Action => {
    return {
        type: 'SET_USER',
        payload
    }
}
export const setIsLogged = (payload: boolean): Action => {
    return {
        type: 'SET_USER_LOGGED',
        payload
    }
}