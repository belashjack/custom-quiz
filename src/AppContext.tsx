import { FC, ReactNode, createContext, useMemo } from 'react';
import { RoundType } from './types';

interface AppContextProps {
    rounds: RoundType[];
}

export const AppContext = createContext<AppContextProps>({ rounds: [] });

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const value = useMemo(() => ({ rounds: [] }), []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
