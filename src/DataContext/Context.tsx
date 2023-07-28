import { createContext } from "react";
import { DEFAULT_STATE } from "../shared/constains";
import { IState } from "../shared/interfaces";

export type Action = 
  | { type: "SET_USER"; payload: {email: string, password: string, username: string, bio: string | null, image: string} }
  | { type: "SET_USER_LOGGED"; payload: boolean };
export const reducer = (state = DEFAULT_STATE, action: Action) => {
    switch (action.type) {
          case "SET_USER":
            return {
            ...state,
              user: action.payload
            };
          case "SET_USER_LOGGED":
            return {
              ...state,
              isLogged: action.payload
              };
            
          default:
            return state;
        }
};

export const Context = createContext<{
    state: IState;
    dispatch: React.Dispatch<Action>;
  }>({
    state: DEFAULT_STATE,
    dispatch: () => {},
});