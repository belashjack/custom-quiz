import { FC, ReactNode, createContext, useState } from 'react';
import { Round } from './rounds/types';
import { roundsConfig } from './rounds/roundsConfig';
import { EASY_MODE_SEARCH_PARAM, INITIAL_LIVES_NUMBER } from './constants';

interface AppContextProps {
    rounds: Round[];
    currentRoundIndex: number;
    goToNextRound: () => void;
    goToPreviousRound: () => void;
    isEasyMode: boolean;
    livesNumber: number;
    killLife: () => void;
    startAgain: () => void;
}

const APP_CONTEXT_DEFAULT_VALUE: AppContextProps = {
    rounds: [],
    currentRoundIndex: 0,
    goToNextRound: () => {
        // Do nothing
    },
    goToPreviousRound: () => {
        // Do nothing
    },
    isEasyMode: false,
    livesNumber: 0,
    killLife: () => {
        // Do nothing
    },
    startAgain: () => {
        // Do nothing
    },
};

export const AppContext = createContext<AppContextProps>(APP_CONTEXT_DEFAULT_VALUE);

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rounds, setRounds] = useState<Round[]>(roundsConfig);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [livesNumber, setLivesNumber] = useState(INITIAL_LIVES_NUMBER);
    const searchParams = new URLSearchParams(window.location.search);

    return (
        <AppContext.Provider
            // Let's see if there will be any problems with this rule disabled
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                rounds,
                currentRoundIndex,
                goToNextRound: () => {
                    window.scrollTo({ top: 0 });
                    setCurrentRoundIndex(currentRoundIndex + 1);
                },
                goToPreviousRound: () => {
                    window.scrollTo({ top: 0 });
                    setCurrentRoundIndex(currentRoundIndex - 1);
                },
                isEasyMode: searchParams.get(EASY_MODE_SEARCH_PARAM) === 'true',
                livesNumber,
                killLife: () => {
                    setLivesNumber(livesNumber - 1);
                },
                startAgain: () => {
                    setCurrentRoundIndex(0);
                    setLivesNumber(INITIAL_LIVES_NUMBER);
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
