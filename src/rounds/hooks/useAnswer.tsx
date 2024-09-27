import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Answer } from '../types';

const answerExists = <T,>(answer: T | null): answer is T => answer !== null;

const useAnswer = <T extends Answer>(winDetector: (answer: T) => boolean) => {
    const {
        killLife,
        isEasyMode,
        progress: { currentRoundIndex, rounds },
        saveAnswer,
    } = useContext(AppContext);
    const currentRoundProgress = rounds[currentRoundIndex];

    const answer = currentRoundProgress.answer as T | null;

    const isWin = answerExists(answer) && winDetector(answer);
    const isLose = answerExists(answer) && !isWin;

    const setAnswer = (newAnswer: T | null, isLoseByTimer = false) => {
        const willWin = answerExists(newAnswer) && winDetector(newAnswer);
        const willLose = answerExists(newAnswer) && !willWin;

        if (willLose && !isEasyMode) {
            killLife();
        }

        saveAnswer(newAnswer, isLoseByTimer);
    };

    return {
        answer,
        answerExists,
        setAnswer,
        isWin,
        isLose,
        isLoseByTimer: Boolean(currentRoundProgress.isLoseByTimer),
    };
};

export default useAnswer;
