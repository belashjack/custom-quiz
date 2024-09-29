import { FC } from 'react';
import Balloon, { BalloonType } from './Balloon';
import './HappyBirthdayBalloon.scss';

export interface HappyBirthdayBalloonType extends BalloonType {
    letter: string;
    leftPosition: string;
    finishPosition: string;
}

interface HappyBirthdayBalloonProps {
    balloon: HappyBirthdayBalloonType;
}

const ANIMATION_DURATION_BASE = 2;
const SPEED_ADDITION_BASE = 1;

const HappyBirthdayBalloon: FC<HappyBirthdayBalloonProps> = ({ balloon }) => {
    const { leftPosition, finishPosition, ...restBaloon } = balloon;

    return (
        <Balloon
            className="happy-birthday-balloon"
            balloon={restBaloon}
            style={
                {
                    '--left-position': leftPosition,
                    '--finish-position': finishPosition,
                    '--animation-duration': `${ANIMATION_DURATION_BASE + Math.random() * SPEED_ADDITION_BASE}s`,
                    '--animation-delay': `${Math.random() * 2}s`,
                } as React.CSSProperties
            }
        />
    );
};

export default HappyBirthdayBalloon;
