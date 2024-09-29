import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { BalloonsRound } from '../types';
import GameBalloon, { GameBalloonType } from './Balloon/GameBalloon';
import useAnswer from '../hooks/useAnswer';
import { getRandomFromArray } from '../utils';
import { AppContext } from '../../AppContext';
import { BALLOON_COLOR } from './Balloon/Balloon';
import HappyBirthdayBalloons from './HappyBirthdayBalloons';

const CORRECT_BALLOON_PROBABILITY = 0.4;

const getInitialGameBalloons = (correctColor: BALLOON_COLOR, isEasyGame: boolean): GameBalloonType[] => {
    const incorrectColors = Object.values(BALLOON_COLOR).filter((color) => color !== correctColor);
    const balloonCount = isEasyGame ? 10 : 50;
    const redBalloonCount = Math.max(1, Math.ceil(balloonCount * CORRECT_BALLOON_PROBABILITY));
    const balloonColors: BALLOON_COLOR[] = [];

    for (let i = 0; i < redBalloonCount; i = i + 1) {
        balloonColors.push(correctColor);
    }

    for (let i = redBalloonCount; i < balloonCount; i = i + 1) {
        balloonColors.push(getRandomFromArray(incorrectColors));
    }

    balloonColors.sort(() => 0.5 - Math.random());

    return balloonColors.map((color, index) => ({ id: index, isPopped: false, color }));
};

const Balloons: FC<BalloonsRound> = (props) => {
    const {
        content: { description, correctColor, difficulty, happyBirthdayName },
    } = props;
    const { isEasyMode } = useContext(AppContext);
    const isEasyGame = isEasyMode || difficulty === 'EASY';
    const [gameBalloons, setGameBalloons] = useState(getInitialGameBalloons(correctColor, isEasyGame));
    const containerRef = useRef<HTMLDivElement>(null);

    const winDetector = (answer: boolean) => answer;

    const { answer, answerExists, setAnswer, isWin, isLose, isLoseByTimer } = useAnswer<boolean>(winDetector);

    useEffect(() => {
        if (gameBalloons.filter((balloon) => balloon.color === correctColor).every((balloon) => balloon.isPopped)) {
            setAnswer(true);
        }
    }, [gameBalloons]);

    const popBalloon = useCallback((id: number, color: BALLOON_COLOR) => {
        if (color !== correctColor) {
            setAnswer(false);
        }

        setGameBalloons((prevBalloons) => {
            const newBalloons = prevBalloons.map((balloon) => {
                if (balloon.id === id) {
                    return { ...balloon, isPopped: true };
                }

                return balloon;
            });

            return newBalloons;
        });
    }, []);

    const forceLose = useCallback(() => {
        setAnswer(null, true);
    }, []);

    const resetInternalState = () => {
        setGameBalloons(getInitialGameBalloons(correctColor, isEasyGame));
    };

    const isRoundDisabled = answerExists(answer) || isLoseByTimer;

    return (
        <RoundWrapper
            description={description}
            isWin={isWin}
            isLose={isLose}
            isLoseByTimer={isLoseByTimer}
            resetRound={resetInternalState}
        >
            <div ref={containerRef}>
                {!isRoundDisabled &&
                    gameBalloons.map((balloon) => (
                        <GameBalloon
                            key={balloon.id}
                            balloon={balloon}
                            balloonsCount={gameBalloons.length}
                            isCorrectColor={balloon.color === correctColor}
                            containerRef={containerRef}
                            forceLose={forceLose}
                            popBalloon={popBalloon}
                        />
                    ))}
                {isWin && <HappyBirthdayBalloons happyBirthdayName={happyBirthdayName} containerRef={containerRef} />}
            </div>
        </RoundWrapper>
    );
};

export default Balloons;
