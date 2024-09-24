import { useContext, useEffect, useState } from 'react';
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
    const [isLoseByTimer, setIsLoseByTimer] = useState(false);

    const answer = answers[currentRoundIndex] as T | null;

    const isWin = answerExists(answer) && winDetector(answer);
    const isLose = answerExists(answer) && !isWin;

    useEffect(() => {
        if (!answerExists(answer)) {
            setIsLoseByTimer(false);
        }
    }, [answer]);

    const setAnswer = (value: T, lostByTimer = false) => {
        if (lostByTimer) {
            setIsLoseByTimer(true);
        }

        const willWin = winDetector(value);
        const willLose = !willWin;

        if (willLose && !isEasyMode) {
            killLife();
        }

        saveAnswer(value);
    };

    return { answer, answerExists, setAnswer, isWin, isLose, isLoseByTimer };
};

export default useAnswer;
