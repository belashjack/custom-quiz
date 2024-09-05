import { FC, useEffect, useRef } from 'react';
import './Explanation.scss';
import clsx from 'clsx';

interface ExplanationProps {
    text: string;
    isCorrect: boolean;
    isIncorrect: boolean;
}

const Explanation: FC<ExplanationProps> = ({ text, isCorrect, isIncorrect }) => {
    const explanationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        explanationRef.current?.scrollIntoView({ block: 'center' });
    }, []);

    return (
        <div
            ref={explanationRef}
            className={clsx('explanation', {
                'explanation--correct': isCorrect,
                'explanation--incorrect': isIncorrect,
            })}
        >
            {text}
        </div>
    );
};

export default Explanation;
