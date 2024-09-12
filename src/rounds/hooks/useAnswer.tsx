import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppContext';
import { Answer } from '../types';

const answerExists = <T,>(answer: T | null): answer is T => answer !== null;

const useAnswer = <T extends Answer>(winDetector: (answer: T) => boolean) => {
    const {
        killLife,
        isEasyMode,
        progress: { currentRoundIndex, answers },
        saveAnswer,
    } = useContext(AppContext);
    const answer = answers[currentRoundIndex] as T | null;

    const isWin = answerExists(answer) && winDetector(answer);
    const isLose = answerExists(answer) && !isWin;

    useEffect(() => {
        if (isLose && !isEasyMode) {
            killLife();
        }
    }, [answer]);

    return { answer, answerExists, setAnswer: saveAnswer, isWin, isLose };
};

export default useAnswer;
