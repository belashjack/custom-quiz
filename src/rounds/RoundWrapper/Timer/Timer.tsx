import { FC, SVGAttributes, useEffect, useState } from 'react';
import './Timer.scss';
import '../../variables.scss';

interface TimerProps {
    duration: number;
    onTimerPassed?: () => void;
}

const getRemainingColor = (duration: number, timeLeft: number) => {
    const percentageLeft = (timeLeft / duration) * 100;
    if (percentageLeft <= 20) return 'var(--negative-color)';

    if (percentageLeft <= 40) return 'var(--warning-color)';

    return 'var(--positive-color)';
};

const Timer: FC<TimerProps> = ({ duration, onTimerPassed }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 100) return prevTime - 100;

                clearInterval(interval);

                return 0;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimerPassed?.();
        }
    }, [timeLeft]);

    const radius = 27.5;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffsetRemaining = (1 - timeLeft / duration) * circumference;
    const circleCommonAttributes: SVGAttributes<SVGCircleElement> = {
        strokeWidth: 5,
        fill: 'transparent',
        r: radius,
        cx: '50%',
        cy: '50%',
    };

    const color = getRemainingColor(duration, timeLeft);

    return (
        <div className="timer">
            <svg className="timer-circle" width="60" height="60">
                <circle
                    {...circleCommonAttributes}
                    stroke="var(--disabled-color)"
                    style={{ strokeDasharray: circumference, strokeDashoffset: 0 }}
                />
                <circle
                    {...circleCommonAttributes}
                    stroke={color}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffsetRemaining,
                        transition: 'stroke-dashoffset 0.1s linear',
                    }}
                />
            </svg>
            <div className="timer-text" style={{ color }}>
                {(timeLeft / 1000).toFixed(0)}
            </div>
        </div>
    );
};

export default Timer;
