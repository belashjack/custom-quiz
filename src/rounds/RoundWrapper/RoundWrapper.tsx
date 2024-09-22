import { FC, PropsWithChildren, useContext } from 'react';
import { AppContext } from '../../AppContext';
import './RoundWrapper.scss';
import { Description } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faRepeat, faRightLong } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import { INITIAL_LIVES_NUMBER } from '../../constants';

interface RoundWrapperProps extends PropsWithChildren {
    description: Description;
    withoutResetButton?: boolean;
    showResetRoundButton?: boolean;
    showNextRoundButton?: boolean;
    resetRound?: () => void;
}

const RoundWrapper: FC<RoundWrapperProps> = ({
    description,
    children,
    withoutResetButton = false,
    showResetRoundButton = false,
    showNextRoundButton = false,
    resetRound,
}) => {
    const {
        rounds,
        progress: { currentRoundIndex, livesLeft },
        goToPreviousRound,
        tryAgain,
        goToNextRound,
        isEasyMode,
    } = useContext(AppContext);

    const showPreviousRoundButton = isEasyMode && currentRoundIndex > 0;
    const showResetRoundButtonFinal = isEasyMode
        ? !withoutResetButton && (showNextRoundButton || showResetRoundButton)
        : showResetRoundButton;
    const showNextRoundButtonFinal = showNextRoundButton && currentRoundIndex < rounds.length - 1;

    const showFooter = showPreviousRoundButton || showResetRoundButton || showNextRoundButton;

    const handleResetRound = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        resetRound?.();
    };

    return (
        <div className="round">
            {!isEasyMode && (
                <header className="round-header">
                    {Array(INITIAL_LIVES_NUMBER)
                        .fill(null)
                        .map((_, index) => {
                            if (index < livesLeft) {
                                return '❤️';
                            }

                            return '💔';
                        })
                        .join('\u00A0')}
                </header>
            )}
            <div className="round-content">
                <div className="round-description">
                    <div className="round-description-text">{description.text}</div>
                    {Boolean(description.asset) && <div className="round-description-asset">{description.asset}</div>}
                </div>
                {children}
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
                        {showResetRoundButtonFinal && (
                            <Button
                                icon={<FontAwesomeIcon icon={faRepeat} />}
                                onClick={() => {
                                    handleResetRound();
                                    tryAgain();
                                }}
                            >
                                Попробуй еще раз
                            </Button>
                        )}
                    </div>
                    <div>
                        {showNextRoundButtonFinal && (
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
