import { FC, useContext } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { DIFFICULTY, PressButtonRound } from '../types';
import './PressButton.scss';
import usePressButton from './usePressButton';
import { AppContext } from '../../AppContext';
import Button from '../components/Button/Button';

const INITIAL_VALUE = 0;
const FINAL_VALUE = 100;

const DIFFICULTY_TO_STEPS_MAP: Record<DIFFICULTY, { step: number; decrementStep: number }> = {
    EASY: { step: 10, decrementStep: 1 },
    HARD: { step: 2, decrementStep: 1 },
};

const PressButton: FC<PressButtonRound> = (props) => {
    const {
        content: { description, difficulty },
    } = props;
    const { isEasyMode } = useContext(AppContext);
    const { step, decrementStep } = isEasyMode ? DIFFICULTY_TO_STEPS_MAP.EASY : DIFFICULTY_TO_STEPS_MAP[difficulty];
    const { text, increment, isWin } = usePressButton(INITIAL_VALUE, FINAL_VALUE, step, decrementStep);

    const handleClick = () => {
        increment();
    };

    return (
        <RoundWrapper description={description} canHaveNextRoundButton={isWin}>
            <div className="press-button">
                <span className="text">{text}</span>
                {!isWin && (
                    <Button onClick={handleClick} disabled={isWin} withHeartAnimation>
                        Нажимай меня!
                    </Button>
                )}
            </div>
        </RoundWrapper>
    );
};

export default PressButton;
