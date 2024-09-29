/* eslint-disable react/prop-types */
import { memo, useEffect, useRef, useState } from 'react';
import Balloon, { BALLOON_COLOR, BalloonType } from './Balloon';
import './GameBalloon.scss';

export interface GameBalloonType extends BalloonType {
    isPopped: boolean;
}

interface GameBalloonProps {
    balloon: GameBalloonType;
    balloonsCount: number;
    isCorrectColor: boolean;
    containerRef: React.RefObject<HTMLDivElement>;
    forceLose: () => void;
    popBalloon: (id: number, color: BALLOON_COLOR) => void;
}

const ANIMATION_DURATION_BASE = 5;
const SPEED_ADDITION_BASE = 10;
const BALLOON_ROTATE_CORRECTION = 5;

// eslint-disable-next-line prefer-arrow-callback
const GameBalloon = memo<GameBalloonProps>(function GameBalloon(props) {
    const { balloon, balloonsCount, isCorrectColor, containerRef, forceLose, popBalloon } = props;

    const { isPopped, ...restBalloon } = balloon;
    const [leftPosition, setLeftPosition] = useState(`0%`);
    const balloonSvgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const balloonWidthInPx = getComputedStyle(document.documentElement).getPropertyValue('--balloon-width');
            const balloonWidth = parseFloat(balloonWidthInPx);
            const containerWidth = containerRef.current.getBoundingClientRect().width;
            const maxLeft = containerWidth - balloonWidth - BALLOON_ROTATE_CORRECTION;
            const randomLeft = Math.random() * maxLeft + BALLOON_ROTATE_CORRECTION;
            setLeftPosition(`${randomLeft}px`);
        }
    }, [containerRef]);

    const handlePathClick = () => {
        if (!balloonSvgRef.current) return;

        balloonSvgRef.current.classList.add('game-balloon--pop');
    };

    const handleAnimationEnd: React.AnimationEventHandler = (event) => {
        switch (event.animationName) {
            case 'balloonFlightAnimation':
                if (isCorrectColor) {
                    forceLose();
                }
                break;
            case 'pop':
                popBalloon(balloon.id, balloon.color);
                break;
            default:
                break;
        }
    };

    const animationDelay = `${(Math.random() * balloonsCount) / 2.5}s`;

    return (
        <Balloon
            ref={balloonSvgRef}
            balloon={restBalloon}
            className="game-balloon"
            style={
                {
                    '--left-position': leftPosition,
                    '--animation-duration': `${ANIMATION_DURATION_BASE + Math.random() * SPEED_ADDITION_BASE}s`,
                    '--animation-delay': animationDelay,
                    display: isPopped ? 'none' : 'initial',
                    zIndex: isCorrectColor ? 1 : 0,
                } as React.CSSProperties
            }
            onClick={handlePathClick}
            onAnimationEnd={handleAnimationEnd}
        />
    );
});

export default GameBalloon;
