import { FC, useEffect, useRef } from 'react';
import './Explanation.scss';
import clsx from 'clsx';
import { Explanation } from '../../types';

interface ExplanationProps extends Explanation {
    isCorrect?: boolean;
    isIncorrect?: boolean;
}

const Explanation: FC<ExplanationProps> = ({ text, asset, isCorrect, isIncorrect }) => {
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
            <div className="asset">{asset}</div>
            {text}
        </div>
    );
};

export default Explanation;
