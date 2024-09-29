import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { BalloonsRound } from '../types';
import Balloon, { BalloonType } from './Balloon/Balloon';
import useAnswer from '../hooks/useAnswer';
import { getRandomFromArray } from '../utils';
import { AppContext } from '../../AppContext';

const INCORRECT_COLORS = [
    '#ffdd57', // yellow
    '#f9c74f', // light orange
    '#43aa8b', // green
    '#90be6d', // lighter green
    '#577590', // blue
    '#277da1', // teal blue
];

const CORRECT_BALLOON_PROBABILITY = 0.4;

const getInitialBalloons = (correctColor: string, isEasyGame: boolean): BalloonType[] => {
    const balloonCount = isEasyGame ? 10 : 50;
    const redBalloonCount = Math.max(1, Math.ceil(balloonCount * CORRECT_BALLOON_PROBABILITY));
    const balloonColors: string[] = [];

    for (let i = 0; i < redBalloonCount; i = i + 1) {
        balloonColors.push(correctColor);
    }

    for (let i = redBalloonCount; i < balloonCount; i = i + 1) {
        balloonColors.push(getRandomFromArray(INCORRECT_COLORS));
    }

    balloonColors.sort(() => 0.5 - Math.random());

    return balloonColors.map((color, index) => ({ id: index, isPopped: false, color }));
};

const Balloons: FC<BalloonsRound> = (props) => {
    const {
        content: { description, correctColor, difficulty },
    } = props;
    const { isEasyMode } = useContext(AppContext);
    const isEasyGame = isEasyMode || difficulty === 'EASY';
    const [balloons, setBalloons] = useState(getInitialBalloons(correctColor, isEasyGame));
    const containerRef = useRef<HTMLDivElement>(null);

    const winDetector = (answer: boolean) => answer;

    const { answer, answerExists, setAnswer, isWin, isLose, isLoseByTimer } = useAnswer<boolean>(winDetector);

    useEffect(() => {
        if (balloons.filter((balloon) => balloon.color === correctColor).every((balloon) => balloon.isPopped)) {
            setAnswer(true);
        }
    }, [balloons]);

    const popBalloon = useCallback((id: number, color: string) => {
        if (color !== correctColor) {
            setAnswer(false);
        }

        setBalloons((prevBalloons) => {
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
        setBalloons(getInitialBalloons(correctColor, isEasyGame));
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
            {!isRoundDisabled && (
                <div ref={containerRef}>
                    {balloons.map((balloon) => (
                        <Balloon
                            key={balloon.id}
                            balloon={balloon}
                            balloonsCount={balloons.length}
                            isCorrectColor={balloon.color === correctColor}
                            popBalloon={popBalloon}
                            forceLose={forceLose}
                            containerRef={containerRef}
                        />
                    ))}
                </div>
            )}
        </RoundWrapper>
    );
};

export default Balloons;
