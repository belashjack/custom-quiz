import { useEffect, useState } from 'react';
import useAnswer from '../hooks/useAnswer';

const TEXT_RANGES = [
    { min: 0, max: 1, text: '😞' },
    { min: 2, max: 20, text: '🙁' },
    { min: 21, max: 40, text: '😐' },
    { min: 41, max: 60, text: '🙂' },
    { min: 61, max: 80, text: '😃' },
    { min: 81, max: 99, text: '😍' },
    { min: 100, max: 100, text: '❤️' },
];

const findRange = (value: number) => TEXT_RANGES.find(({ min, max }) => value >= min && value <= max);

const usePressButton = (initialValue: number, finalValue: number, step: number, decrementStep: number) => {
    const winDetector = (answer: boolean) => answer;
    const { answer, setAnswer, isWin, isLose, isLoseByTimer } = useAnswer<boolean>(winDetector);
    const [value, setValue] = useState(isWin ? finalValue : initialValue);
    const [text, setText] = useState(findRange(value)?.text);
    const [isTimerActive, setIsTimerActive] = useState(!isWin);

    const updateText = (newValue: number, direction: 'increment' | 'decrement') => {
        const range = findRange(newValue);

        if (!range) return;

        const { min, max } = range;
        const isIncrement = direction === 'increment';
        const isSignificantChange = isIncrement ? newValue - min >= step : max - newValue >= decrementStep;

        if (isSignificantChange || newValue === (isIncrement ? finalValue : initialValue)) {
            setText(range.text);
        }
    };

    useEffect(() => {
        if (!isTimerActive) return;

        const timer = setInterval(() => {
            setValue((prevValue) => {
                const newValue = Math.max(prevValue - decrementStep, initialValue);
                updateText(newValue, 'decrement');

                return newValue;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [isTimerActive]);

    useEffect(() => {
        if (value === finalValue) {
            setAnswer(true);
        }
    }, [value]);

    useEffect(() => {
        if (answer === null) {
            setValue(initialValue);
            setText(findRange(initialValue)?.text);
            setIsTimerActive(true);
        }
    }, [answer]);

    const increment = () => {
        setValue((prevValue) => {
            const newValue = Math.min(prevValue + step, finalValue);

            updateText(newValue, 'increment');

            if (newValue >= finalValue) {
                setIsTimerActive(false);
            }

            return newValue;
        });
    };

    return { text, increment, isWin, isLose, isLoseByTimer, setAnswer };
};

export default usePressButton;
