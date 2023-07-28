import React, { useReducer, useContext, useEffect} from 'react';
import { Action, Context, reducer } from './Context';
import { DEFAULT_STATE } from '../shared/constains';
import { getCurrentUser } from '../shared/api/api';
import { setIsLogged, setUser } from './helper';
import { IState } from '../shared/interfaces';

interface ProviderProps {
    children: React.ReactNode
}
function Provider ({ children }: ProviderProps): JSX.Element {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
    useEffect(() => {
      async function fetchData (): Promise<void> {
        try {
          const response = await getCurrentUser();
          dispatch(setUser(response.user));
          dispatch(setIsLogged(true));
        } catch (error) {
          dispatch(setIsLogged(false));
        }
      }
      void fetchData();
    }, []);
  
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  }
  
  export const useRealWorld = (): { state: IState, dispatch: React.Dispatch<Action> } => useContext(Context);
  export default Provider;