import { FC, ReactNode, createContext, useState } from 'react';
import { Round } from './rounds/types';
import { roundsConfig } from './rounds/roundsConfig';

interface AppContextProps {
    rounds: Round[];
    updateRounds: (rounds: Round[]) => void;
    currentRoundIndex: number;
    goToNextRound: () => void;
    goToPreviousRound: () => void;
}

const APP_CONTEXT_DEFAULT_VALUE: AppContextProps = {
    rounds: [],
    updateRounds: () => {
        // Do nothing
    },
    currentRoundIndex: 0,
    goToNextRound: () => {
        // Do nothing
    },
    goToPreviousRound: () => {
        // Do nothing
    },
};

export const AppContext = createContext<AppContextProps>(APP_CONTEXT_DEFAULT_VALUE);

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const [rounds, setRounds] = useState<Round[]>(roundsConfig);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

    return (
        <AppContext.Provider
            // Let's see if there will be any problems with this rule disabled
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                rounds,
                updateRounds: setRounds,
                currentRoundIndex,
                goToNextRound: () => {
                    window.scrollTo({ top: 0 });
                    setCurrentRoundIndex(currentRoundIndex + 1);
                },
                goToPreviousRound: () => {
                    window.scrollTo({ top: 0 });
                    setCurrentRoundIndex(currentRoundIndex - 1);
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
