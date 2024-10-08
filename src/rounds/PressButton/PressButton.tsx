import { FC, useContext } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { Difficulty, PressButtonRound } from '../types';
import './PressButton.scss';
import usePressButton from './usePressButton';
import { AppContext } from '../../AppContext';
import Button from '../components/Button/Button';

const INITIAL_VALUE = 0;
const FINAL_VALUE = 100;

const DIFFICULTY_TO_STEPS_MAP: Record<Difficulty, { step: number; decrementStep: number }> = {
    EASY: { step: 10, decrementStep: 1 },
    HARD: { step: 2, decrementStep: 1 },
};

const PressButton: FC<PressButtonRound> = (props) => {
    const {
        content: { title, difficulty },
    } = props;
    const { isEasyMode } = useContext(AppContext);
    const isEasyGame = isEasyMode || difficulty === 'EASY';
    const { step, decrementStep } = isEasyGame ? DIFFICULTY_TO_STEPS_MAP.EASY : DIFFICULTY_TO_STEPS_MAP[difficulty];
    const { text, increment, decrementToInitial, isWin, isLoseByTimer, setAnswer } = usePressButton(
        INITIAL_VALUE,
        FINAL_VALUE,
        step,
        decrementStep
    );

    const handleClick = () => {
        increment();
    };

    const resetInternalState = () => {
        decrementToInitial();
    };

    const isRoundDisabled = isWin || isLoseByTimer;

    return (
        <RoundWrapper
            title={title}
            isWin={isWin}
            isLoseByTimer={isLoseByTimer}
            resetRound={resetInternalState}
            forceLose={() => {
                setAnswer(null, true);
                resetInternalState();
            }}
        >
            <div className="press-button">
                <span className="text">{text}</span>
                {!isRoundDisabled && (
                    <Button onClick={handleClick} withHeartAnimation>
                        Нажимай меня!
                    </Button>
                )}
            </div>
        </RoundWrapper>
    );
};

export default PressButton;
