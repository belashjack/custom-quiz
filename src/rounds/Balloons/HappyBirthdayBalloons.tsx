import { FC, useEffect, useState } from 'react';
import HappyBirthdayBalloon, { HappyBirthdayBalloonType } from './Balloon/HappyBirthdayBalloon';
import { getRandomFromArray } from '../utils';
import { BALLOON_COLOR } from './Balloon/Balloon';

interface HappyBirthdayBalloonsProps {
    happyBirthdayName: string;
    containerRef: React.RefObject<HTMLDivElement>;
}

const BEGINNGING_OF_MESSAGE = 'Happy Birthday';

const getBalloons = (fullMessage: string, containerWidth: number) => {
    const balloonWidthInPx = getComputedStyle(document.documentElement).getPropertyValue('--balloon-width');
    const balloonHeightInPx = getComputedStyle(document.documentElement).getPropertyValue('--balloon-height');
    const balloonWidth = parseFloat(balloonWidthInPx);
    const balloonHeight = parseFloat(balloonHeightInPx);

    const words = fullMessage.split(' ');

    return words.reduce<HappyBirthdayBalloonType[]>((acc, word, rowIndex) => {
        const letters = word.split('');

        const baloons = letters.map<HappyBirthdayBalloonType>((letter, index) => ({
            id: Number(String(rowIndex) + String(index)),
            color: getRandomFromArray(Object.values(BALLOON_COLOR)),
            letter,
            leftPosition: `${containerWidth / 2 + balloonWidth * index - (balloonWidth * letters.length) / 2 + balloonWidth / 2}px`,
            finishPosition: `calc(-70vh + ${balloonHeight * rowIndex}px)`,
        }));

        return [...acc, ...baloons];
    }, []);
};

const HappyBirthdayBalloons: FC<HappyBirthdayBalloonsProps> = ({ happyBirthdayName, containerRef }) => {
    const fullMessage = `${BEGINNGING_OF_MESSAGE} ${happyBirthdayName}!`;

    const [balloons, setBalloons] = useState<HappyBirthdayBalloonType[]>([]);

    useEffect(() => {
        const containerWidth = containerRef.current?.getBoundingClientRect().width ?? 0;
        const newBalloons = getBalloons(fullMessage, containerWidth);

        setBalloons(newBalloons);
    }, [containerRef]);

    return balloons.map((balloon) => <HappyBirthdayBalloon key={balloon.id} balloon={balloon} />);
};

export default HappyBirthdayBalloons;
