import { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';
import './RoundWrapper.scss';
import { Description, Round } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faRepeat, faRightLong } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import { INITIAL_LIVES_NUMBER } from '../../constants';
import Explanation from '../components/Explanation/Explanation';
import Timer from './Timer/Timer';

interface RoundWrapperProps extends PropsWithChildren {
    description: Description;
    showHeader?: boolean;
    isWin?: boolean;
    isLose?: boolean;
    isLoseByTimer?: boolean;
    withoutResetButton?: boolean;
    resetRound?: () => void;
    forceLose?: () => void;
}

const getLoseExplanation = (isLoseByTimer: boolean, currentRound: Round) => {
    const { content, timerOptions } = currentRound;
    let loseExplanation;

    if (isLoseByTimer && timerOptions && 'loseByTimerExplanation' in timerOptions) {
        loseExplanation = timerOptions.loseByTimerExplanation;
    } else if ('loseExplanation' in content) {
        // eslint-disable-next-line @typescript-eslint/prefer-destructuring
        loseExplanation = content.loseExplanation;
    }

    return loseExplanation;
};

const RoundWrapper: FC<RoundWrapperProps> = ({
    children,
    description,
    showHeader = true,
    isWin = false,
    isLose = false,
    isLoseByTimer = false,
    withoutResetButton = false,
    resetRound,
    forceLose,
}) => {
    const {
        rounds,
        progress: { currentRoundIndex, livesLeft },
        goToPreviousRound,
        tryAgain,
        goToNextRound,
        isEasyMode,
    } = useContext(AppContext);
    const currentRound = rounds[currentRoundIndex];

    const [showTimer, setShowTimer] = useState(!isWin && !isLose && !isLoseByTimer);

    useEffect(() => {
        if (isWin || isLose || isLoseByTimer) {
            setShowTimer(false);
        }
    }, [isWin, isLose, isLoseByTimer]);

    const showPreviousRoundButton = isEasyMode && currentRoundIndex > 0;
    // eslint-disable-next-line no-nested-ternary
    const showResetRoundButton = withoutResetButton ? false : isEasyMode ? isWin || isLose : isLose;
    const showNextRoundButton = isWin && currentRoundIndex < rounds.length - 1;

    const showFooter = showPreviousRoundButton || showResetRoundButton || showNextRoundButton;

    const handleResetRound = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        resetRound?.();
        setShowTimer(Boolean(currentRound.timerOptions));
        tryAgain();
    };

    const loseExplanation = getLoseExplanation(isLoseByTimer, currentRound);

    return (
        <div className="round">
            {showHeader && !isEasyMode && (
                <header className="round-header">
                    <div>
                        {Array(INITIAL_LIVES_NUMBER)
                            .fill(null)
                            .map((_, index) => {
                                if (index < livesLeft) {
                                    return '❤️';
                                }

                                return '💔';
                            })
                            .join('\u00A0')}
                    </div>

                    {showTimer && currentRound.timerOptions && (
                        <Timer duration={currentRound.timerOptions.duration} onTimerPassed={forceLose} />
                    )}
                </header>
            )}
            <div className="round-content">
                <div className="round-description">
                    <div className="round-description-text">{description.text}</div>
                    {Boolean(description.asset) && <div className="round-description-asset">{description.asset}</div>}
                </div>
                {children}
                {isWin && 'winExplanation' in currentRound.content && (
                    <Explanation isCorrect {...currentRound.content.winExplanation} />
                )}
                {(isLose || isLoseByTimer) && loseExplanation && <Explanation isIncorrect {...loseExplanation} />}
            </div>
            {showFooter && (
                <footer className="round-footer">
                    <div>
                        {showPreviousRoundButton && (
                            <Button icon={<FontAwesomeIcon icon={faLeftLong} />} onClick={goToPreviousRound}>
                                Назад
                            </Button>
                        )}
                    </div>
                    <div>
                        {showResetRoundButton && (
                            <Button icon={<FontAwesomeIcon icon={faRepeat} />} onClick={handleResetRound}>
                                Попробуй еще раз
                            </Button>
                        )}
                    </div>
                    <div>
                        {showNextRoundButton && (
                            <Button
                                icon={<FontAwesomeIcon icon={faRightLong} />}
                                iconPosition="right"
                                onClick={() => {
                                    goToNextRound();
                                }}
                            >
                                Дальше
                            </Button>
                        )}
                    </div>
                </footer>
            )}
        </div>
    );
};

export default RoundWrapper;
