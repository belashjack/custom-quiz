import { FC, useState } from 'react';
import RoundWrapper from './RoundWrapper';
import { SimpleQuizRound } from './types';

const SimpleQuiz: FC<SimpleQuizRound> = (props) => {
    const { content } = props;
    const { description } = content;
    const [isGameWon, setIsGameWon] = useState(false);

    const onWin = () => {
        setIsGameWon(true);
    };

    return (
        <RoundWrapper showNextRoundButton={isGameWon}>
            <div className="round-description">{description}</div>
            <div>Простой квиз</div>
            <button type="button" onClick={() => onWin()}>
                Выиграть игру
            </button>
        </RoundWrapper>
    );
};

export default SimpleQuiz;
