import { FC, useContext, useEffect, useRef } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { PuzzleRound } from '../types';
import useAnswer from '../hooks/useAnswer';
import { AppContext } from '../../AppContext';
import './Puzzle.scss';
import createPuzzle from './createPuzzle';

const Puzzle: FC<PuzzleRound> = (props) => {
    const {
        content: { title, imageUrl, difficulty },
    } = props;
    const { isEasyMode } = useContext(AppContext);
    const isEasyGame = isEasyMode || difficulty === 'EASY';
    const puzzleRef = useRef<HTMLDivElement>(null);
    const initialSize = 620;

    const winDetector = (answer: boolean) => answer;

    const { answer, answerExists, setAnswer, isWin, isLoseByTimer } = useAnswer<boolean>(winDetector);

    const onSolved = () => {
        setAnswer(true);
    };

    let resizeCanvas: () => void;

    useEffect(() => {
        const puzzleElement = puzzleRef.current;

        if (!puzzleElement) return;

        const image = new Image();
        image.src = imageUrl;

        image.onload = () => {
            const shouldShuffle = !answerExists(answer);
            const methods = createPuzzle(puzzleElement, initialSize, image, onSolved, shouldShuffle, isEasyGame);
            ({ resizeCanvas } = methods);

            resizeCanvas(); // resise for first render (for mobile devices)

            window.addEventListener('resize', resizeCanvas);
        };

        return () => {
            image.onload = null;
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [imageUrl, answer, isLoseByTimer]);

    const isRoundDisabled = answerExists(answer) || isLoseByTimer;

    return (
        <RoundWrapper
            title={title}
            isWin={isWin}
            isLoseByTimer={isLoseByTimer}
            forceLose={() => {
                setAnswer(null, true);
            }}
        >
            <div className="puzzle-container">
                <div
                    ref={puzzleRef}
                    id="puzzle"
                    style={{
                        width: `${initialSize}px`,
                        aspectRatio: 1 / 1,
                        pointerEvents: isRoundDisabled ? 'none' : 'auto',
                    }}
                />
            </div>
        </RoundWrapper>
    );
};

export default Puzzle;
