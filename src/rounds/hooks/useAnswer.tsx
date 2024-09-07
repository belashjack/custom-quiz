import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import { Answer } from '../types';

const useAnswer = <T extends Answer>(winDetector: (answer: T) => boolean) => {
    const { killLife, isEasyMode } = useContext(AppContext);
    const [answer, setAnswer] = useState<T | null>(null);

    const answerExists = answer !== null;

    const isWin = answerExists && winDetector(answer);
    const isLose = answerExists && !isWin;

    useEffect(() => {
        if (!isEasyMode && isLose) {
            killLife();
        }
    }, [answer]);

    return { answer, answerExists, giveAnswer: setAnswer, isWin, isLose };
};

export default useAnswer;
