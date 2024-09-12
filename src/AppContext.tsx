import { FC, ReactNode, createContext, useState } from 'react';
import { Answer, Progress, Round } from './rounds/types';
import { roundsConfig } from './rounds/roundsConfig';
import { EASY_MODE_SEARCH_PARAM, INITIAL_LIVES_NUMBER } from './constants';
import useSessionStorage from './rounds/hooks/useSessionStorage';

interface AppContextProps {
    rounds: Round[];
    goToNextRound: () => void;
    tryAgain: () => void;
    goToPreviousRound: () => void;
    isEasyMode: boolean;
    killLife: () => void;
    startAgain: () => void;
    progress: Progress;
    saveAnswer: (answer: Answer) => void;
}

const APP_CONTEXT_DEFAULT_VALUE: AppContextProps = {
    rounds: [],
    goToNextRound: () => {
        // Do nothing
    },
    tryAgain: () => {
        // Do nothing
    },
    goToPreviousRound: () => {
        // Do nothing
    },
    isEasyMode: false,
    killLife: () => {
        // Do nothing
    },
    startAgain: () => {
        // Do nothing
    },
    progress: {
        currentRoundIndex: 0,
        livesLeft: 0,
        answers: { 0: null },
    },
    saveAnswer: () => {
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
    const searchParams = new URLSearchParams(window.location.search);

    const progressInitialValue: Progress = {
        currentRoundIndex: 0,
        livesLeft: INITIAL_LIVES_NUMBER,
        answers: Object.fromEntries(rounds.map((_, index) => [index, null])),
    };

    const [progress, setProgress] = useSessionStorage<Progress>('progress', progressInitialValue);

    const setProgressField = (field: keyof Progress, value: Progress[keyof Progress]) => {
        setProgress((progress) => ({
            ...progress,
            [field]: value,
        }));
    };

    return (
        <AppContext.Provider
            // Let's see if there will be any problems with this rule disabled
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                rounds,
                goToNextRound: () => {
                    window.scrollTo({ top: 0 });
                    setProgressField('currentRoundIndex', progress.currentRoundIndex + 1);
                },
                tryAgain: () => {
                    setProgressField('answers', { ...progress.answers, [progress.currentRoundIndex]: null });
                },
                goToPreviousRound: () => {
                    window.scrollTo({ top: 0 });
                    setProgressField('currentRoundIndex', progress.currentRoundIndex - 1);
                },
                isEasyMode: searchParams.get(EASY_MODE_SEARCH_PARAM) === 'true',
                killLife: () => {
                    setProgressField('livesLeft', progress.livesLeft - 1);
                },
                startAgain: () => {
                    setProgress(progressInitialValue);
                },
                progress,
                saveAnswer: (answer) => {
                    setProgressField('answers', { ...progress.answers, [progress.currentRoundIndex]: answer });
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
