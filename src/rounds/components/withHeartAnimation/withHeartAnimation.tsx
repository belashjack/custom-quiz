import { FC, useRef } from 'react';
import './withHeartAnimation.scss';

export interface WithHeartAnimationProps {
    withHeartAnimation?: boolean;
    onClick?: () => void;
}

const ANIMATIONS = ['float-1', 'float-2', 'float-3', 'float-4'];

const createHeartElement = () => {
    const randomAnimation = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💙';
    heart.style.animationName = randomAnimation;
    heart.style.filter = `hue-rotate(${Math.random() * 100 * 3.6}deg)`;
    heart.onanimationend = ({ currentTarget }) => (currentTarget as HTMLElement).remove();

    return heart;
};

const withHeartAnimation = <P extends WithHeartAnimationProps>(
    WrappedComponent: React.ComponentType<P & WithHeartAnimationProps>
): FC<P> => {
    return function withHeartAnimation(props) {
        const containerRef = useRef<HTMLDivElement>(null);

        const { withHeartAnimation, onClick, ...rest } = props;

        if (withHeartAnimation === undefined || !withHeartAnimation)
            return <WrappedComponent {...({ ...rest, onClick } as P)} />;

        const handleClick = () => {
            const heartElement = createHeartElement();
            containerRef.current?.appendChild(heartElement);

            onClick?.();
        };

        return (
            <div ref={containerRef} className="hearts-wrapper">
                <WrappedComponent {...(rest as P)} className="hearts-trigger" onClick={handleClick} />
            </div>
        );
    };
};

export default withHeartAnimation;
