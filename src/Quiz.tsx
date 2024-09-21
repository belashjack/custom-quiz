import { useContext } from 'react';
import { AppContext } from './AppContext';
import { Round, RoundType } from './rounds/types';
import Preview from './rounds/Preview/Preview';
import SimpleQuiz from './rounds/SimpleQuiz/SimpleQuiz';
import GameOver from './rounds/GameOver/GameOver';
import InputCorrectAnswer from './rounds/InputCorrectAnswer/InputCorrectAnswer';
import DragAndDrop from './rounds/DragAndDrop/DragAndDrop';
import PressButton from './rounds/PressButton/PressButton';

const renderRoundComponent = (currentRound: Round, currentRoundIndex: number) => {
    switch (currentRound.type) {
        case RoundType.PREVIEW:
            return <Preview key={currentRoundIndex} {...currentRound} />;
        case RoundType.SIMPLE_QUIZ:
            return <SimpleQuiz key={currentRoundIndex} {...currentRound} />;
        case RoundType.INPUT_CORRECT_ANSWER:
            return <InputCorrectAnswer key={currentRoundIndex} {...currentRound} />;
        case RoundType.DRAG_AND_DROP:
            return <DragAndDrop key={currentRoundIndex} {...currentRound} />;
        case RoundType.PRESS_BUTTON:
            return <PressButton key={currentRoundIndex} {...currentRound} />;
        default:
            return null;
    }
};

const Quiz = () => {
    const {
        rounds,
        progress: { currentRoundIndex, livesLeft },
    } = useContext(AppContext);

    if (livesLeft === 0) {
        return <GameOver />;
    }

    const currentRound = rounds[currentRoundIndex];

    return renderRoundComponent(currentRound, currentRoundIndex);
};

export default Quiz;
