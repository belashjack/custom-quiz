import { useContext } from 'react';
import { AppContext } from './AppContext';
import { Round, RoundType } from './rounds/types';
import Preview from './rounds/Preview/Preview';
import SimpleQuiz from './rounds/SimpleQuiz/SimpleQuiz';

const renderRoundComponent = (currentRound: Round) => {
    switch (currentRound.type) {
        case RoundType.PREVIEW:
            return <Preview {...currentRound} />;
        case RoundType.SIMPLE_QUIZ:
            return <SimpleQuiz {...currentRound} />;
        default:
            return null;
    }
};

const Quiz = () => {
    const { rounds, currentRoundIndex } = useContext(AppContext);
    const currentRound = rounds[currentRoundIndex];

    return renderRoundComponent(currentRound);
};

export default Quiz;
