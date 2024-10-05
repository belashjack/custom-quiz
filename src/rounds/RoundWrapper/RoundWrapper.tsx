import { FC, PropsWithChildren, useContext } from 'react';
import { AppContext } from '../../AppContext';
import './RoundWrapper.scss';
import { Round, Title } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faRepeat, faRightLong } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import { INITIAL_LIVES_NUMBER } from '../../constants';
import Explanation from '../components/Explanation/Explanation';
import Timer from './Timer/Timer';
import { encodeToMorse } from '../utils';
import clsx from 'clsx';

interface RoundWrapperProps extends PropsWithChildren {
    title?: Title;
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
    title,
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

    const showPreviousRoundButton = isEasyMode && currentRoundIndex > 0 && (isWin || isLose || isLoseByTimer);
    // eslint-disable-next-line no-nested-ternary
    const showResetRoundButton = withoutResetButton
        ? false
        : isEasyMode
          ? isWin || isLose || isLoseByTimer
          : isLose || isLoseByTimer;
    const showNextRoundButton = isWin && currentRoundIndex < rounds.length - 1;

    const showFooter = showPreviousRoundButton || showResetRoundButton || showNextRoundButton;

    const handleResetRound = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        resetRound?.();
        tryAgain();
    };

    const loseExplanation = getLoseExplanation(isLoseByTimer, currentRound);
    const showHeaderFinal = showHeader && !isEasyMode;

    return (
        <div className="round">
            {showHeaderFinal && (
                <header className="round-header">
                    <div className="lives">
                        {Array(INITIAL_LIVES_NUMBER)
                            .fill(null)
                            .map((_, index) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <span key={index}>{index < livesLeft ? '❤️' : '💔'}</span>
                            ))}
                    </div>
                    {currentRound.timerOptions && !isWin && !isLose && !isLoseByTimer && (
                        <Timer duration={currentRound.timerOptions.duration} onTimerPassed={forceLose} />
                    )}
                </header>
            )}
            <div className="round-content" style={{ minHeight: showHeaderFinal ? `calc(100vh - 5.313rem)` : '100vh' }}>
                {title && (
                    <div className="round-title">
                        <h1
                            className={clsx('round-title-text', {
                                'round-title-text--upside-down': Boolean(title.isUpsideDown),
                                'round-title-text--morse-code': Boolean(title.isMorseCode),
                            })}
                        >
                            {title.isMorseCode ?? false ? encodeToMorse(title.text) : title.text}
                        </h1>
                        {Boolean(title.asset) && <div className="round-title-asset">{title.asset}</div>}
                    </div>
                )}
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
