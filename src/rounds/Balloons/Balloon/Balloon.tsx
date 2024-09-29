/* eslint-disable react/prop-types */
import { memo, useEffect, useRef, useState } from 'react';
import './Balloon.scss';
import clsx from 'clsx';

export interface BalloonType {
    id: number;
    isPopped: boolean;
    color: string;
}

interface BalloonProps {
    balloon: BalloonType;
    isCorrectColor: boolean;
    balloonsCount: number;
    popBalloon: (id: number, color: string) => void;
    forceLose: () => void;
    containerRef: React.RefObject<HTMLDivElement>;
}

const ANIMATION_DURATION_BASE = 5;
const SPEED_ADDITION_BASE = 10;
const BALLOON_ROTATE_CORRECTION = 5;

// eslint-disable-next-line prefer-arrow-callback
const Balloon = memo<BalloonProps>(function Balloon({
    balloon: { id, color, isPopped },
    isCorrectColor,
    balloonsCount,
    popBalloon,
    forceLose,
    containerRef,
}) {
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

        balloonSvgRef.current.classList.add('balloon--pop');
    };

    const handleAnimationEnd: React.AnimationEventHandler = (event) => {
        switch (event.animationName) {
            case 'balloonFlightAnimation':
                if (isCorrectColor) {
                    forceLose();
                }
                break;
            case 'pop':
                popBalloon(id, color);
                break;
            default:
                break;
        }
    };

    const animationDelay = `${(Math.random() * balloonsCount) / 2.5}s`;

    return (
        <svg
            ref={balloonSvgRef}
            className={clsx('balloon')}
            style={
                {
                    '--left-position': leftPosition,
                    '--animation-duration': `${ANIMATION_DURATION_BASE + Math.random() * SPEED_ADDITION_BASE}s`,
                    '--animation-delay': animationDelay,
                    display: isPopped ? 'none' : 'initial',
                    color,
                    zIndex: isCorrectColor ? 1 : 0,
                } as React.CSSProperties
            }
            onAnimationEnd={handleAnimationEnd}
            xmlns="http://www.w3.org/2000/svg"
            id="svg548"
            viewBox="87 8 295 481"
        >
            <defs id="defs550">
                <linearGradient id="linearGradient608">
                    {' '}
                    <stop id="stop609" offset={0} style={{ stopColor: '#ffffff', stopOpacity: 1 }} />{' '}
                    <stop id="stop610" offset={1} style={{ stopColor: '#000000', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="linearGradient601">
                    {' '}
                    <stop id="stop602" offset={0} style={{ stopColor: '#e6cd00', stopOpacity: 1 }} />{' '}
                    <stop id="stop603" offset={1} style={{ stopColor: '#ff9f2d', stopOpacity: 1 }} />
                </linearGradient>
                <radialGradient
                    cx={0.30468768}
                    cy={0.32812488}
                    fx={0.30468768}
                    fy={0.32812488}
                    gradientUnits="objectBoundingBox"
                    id="radialGradient604"
                    r={0.32960984}
                    spreadMethod="pad"
                />
                <radialGradient
                    cx={0.44804481}
                    cy={0.97655141}
                    fx={0.44804481}
                    fy={0.97655141}
                    gradientUnits="objectBoundingBox"
                    id="radialGradient607"
                    r={0.7710681}
                    spreadMethod="pad"
                />
                <radialGradient id="radialGradient904" />
            </defs>
            <path
                d="M 383.750000 228.125000 A 146.875000 169.375000 0 1 0 90.000000,228.125000 A 146.875 169.375 0 1 0 383.75 228.125 L 236.875000 228.125000 z"
                id="path1044"
                style={{
                    fontSize: 12,
                    fill: 'currentColor',
                    fillRule: 'evenodd',
                    stroke: 'none',
                    strokeWidth: '1pt',
                    cursor: 'pointer',
                }}
                transform="matrix(1.000000,0.000000,0.000000,1.041039,-2.500000,-52.41103)"
                onClick={handlePathClick}
            />
            <path
                d="M 227.5 361.875 C 227.5 362.5 227.5 368.75 227.5 370 C 227.5 371.25 230.625 366.875 224.375 375 C 218.125 383.125 212.5 381.875 217.5 385 C 222.5 388.125 223.75 385.625 227.5 385 C 231.25 384.375 229.375 387.5 233.75 388.125 C 238.125 388.75 239.375 388.75 242.5 386.875 C 245.625 385 241.25 383.125 248.125 385 C 255 386.875 256.25 390.625 258.75 388.75 C 261.25 386.875 256.875 388.75 256.875 384.375 C 256.875 380 254.375 375.625 253.125 375 C 251.875 374.375 246.875 373.75 246.875 368.125 C 246.875 362.5 245.625 361.25 245.625 361.25 C 245.625 361.25 230.625 363.125 227.5 361.875 z "
                id="path1046"
                style={{ fontSize: 12, fill: 'currentColor', fillRule: 'evenodd', stroke: 'none', strokeWidth: '1pt' }}
                transform="matrix(1.000000,0.000000,0.000000,1.041039,0.000000,-15.97466)"
            />
            <path
                d="M 246.25 365 L 227.5 365 L 247.5 371.25 L 226.25 368.75 C 226.25 368.75 215 391.25 227.5 413.75 C 240 436.25 243.75 430 240 451.25 C 236.25 472.5 226.25 483.75 228.75 488.75 "
                id="path1047"
                style={{
                    fill: 'none',
                    fillRule: 'evenodd',
                    stroke: 'black',
                    strokeOpacity: 1,
                    strokeWidth: 3.125,
                    strokeLinejoin: 'miter',
                    strokeLinecap: 'butt',
                    fillOpacity: 1,
                    strokeDasharray: 'none',
                }}
            />
            <path
                d="M 408.75 121.25 C 408.75 121.25 395 152.5 395 168.75 C 395 185 393.75 187.5 395 187.5 C 396.25 187.5 421.25 187.5 421.25 187.5 C 421.25 187.5 421.25 152.5 426.25 141.25 C 431.25 130 436.25 121.25 436.25 121.25 C 436.25 121.25 408.75 120 408.75 121.25 z "
                id="path1053"
                style={{
                    fill: '#ffffff',
                    fillRule: 'evenodd',
                    stroke: 'none',
                    strokeOpacity: 1,
                    strokeWidth: '1pt',
                    strokeLinejoin: 'miter',
                    strokeLinecap: 'butt',
                    fillOpacity: 1,
                }}
                transform="translate(-271.2500,-57.50000)"
            />
            <path
                d="M 408.75 121.25 C 408.75 121.25 395 152.5 395 168.75 C 395 185 393.75 187.5 395 187.5 C 396.25 187.5 421.25 187.5 421.25 187.5 C 421.25 187.5 421.25 152.5 426.25 141.25 C 431.25 130 436.25 121.25 436.25 121.25 C 436.25 121.25 408.75 120 408.75 121.25 z "
                id="path1054"
                style={{
                    fill: '#ffffff',
                    fillRule: 'evenodd',
                    stroke: 'none',
                    strokeOpacity: 1,
                    strokeWidth: '1pt',
                    strokeLinejoin: 'miter',
                    strokeLinecap: 'butt',
                    fillOpacity: 1,
                }}
                transform="translate(-233.7500,-57.50000)"
            />
            <path
                d="M 408.75 118.4 C 405.911 118.4 407.068 139.677 407.068 155.927 C 407.778 172.177 407.948 184.65 409.198 184.65 C 410.448 184.65 434.738 178.951 431.898 183.225 C 429.769 161.854 429.059 163.898 429.8 149.799 C 430.54 134.274 431.281 118.4 431.281 118.4 C 431.281 118.4 408.041 117.15 408.75 118.4 z "
                id="path1055"
                style={{
                    fill: '#ffffff',
                    fillRule: 'evenodd',
                    stroke: 'none',
                    strokeOpacity: 1,
                    strokeWidth: '1pt',
                    strokeLinejoin: 'miter',
                    strokeLinecap: 'butt',
                    fillOpacity: 1,
                }}
                transform="matrix(1.003946,0.000000,0.000000,0.438670,-284.3370,85.24944)"
            />
            <path
                d="M 408.75 118.4 C 405.911 118.4 407.068 139.677 407.068 155.927 C 407.778 172.177 407.948 184.65 409.198 184.65 C 410.448 184.65 434.738 178.951 431.898 183.225 C 429.769 161.854 429.059 163.898 429.8 149.799 C 430.54 134.274 431.281 118.4 431.281 118.4 C 431.281 118.4 408.041 117.15 408.75 118.4 z "
                id="path1056"
                style={{
                    fill: '#ffffff',
                    fillRule: 'evenodd',
                    stroke: 'none',
                    strokeOpacity: 1,
                    strokeWidth: '1pt',
                    strokeLinejoin: 'miter',
                    strokeLinecap: 'butt',
                    fillOpacity: 1,
                }}
                transform="matrix(1.003946,0.000000,0.000000,0.438670,-247.4620,82.74944)"
            />
        </svg>
    );
});

export default Balloon;
