import { FC, useEffect } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { PreviewRound } from '../types';
import { useInView } from 'react-intersection-observer';
import useAnswer from '../hooks/useAnswer';

const Preview: FC<PreviewRound> = (props) => {
    const {
        content: { description },
    } = props;
    const { ref, inView } = useInView({ triggerOnce: true });

    const winDetector = (answer: boolean) => answer;

    const { setAnswer, isWin } = useAnswer<boolean>(winDetector);

    useEffect(() => {
        if (inView) setAnswer(true);
    }, [inView]);

    return (
        <RoundWrapper description={description} canHaveNextRoundButton={isWin}>
            <div ref={ref} />
        </RoundWrapper>
    );
};

export default Preview;
