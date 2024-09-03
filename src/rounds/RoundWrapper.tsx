import { FC, PropsWithChildren, useContext } from 'react';
import { AppContext } from '../AppContext';
import './rounds.scss';
import { BaseRoundContent } from './types';

interface RoundWrapperProps extends PropsWithChildren {
    description: BaseRoundContent['description'];
    canHavePreviousRoundButton?: boolean;
    canHaveResetRoundButton?: boolean;
    canHaveNextRoundButton?: boolean;
    resetRound?: () => void;
}

const RoundWrapper: FC<RoundWrapperProps> = ({
    description,
    children,
    canHavePreviousRoundButton = true,
    canHaveResetRoundButton = false,
    canHaveNextRoundButton = false,
    resetRound,
}) => {
    const { rounds, currentRoundIndex, goToPreviousRound, goToNextRound } = useContext(AppContext);

    const showPreviousRoundButton = canHavePreviousRoundButton && currentRoundIndex > 0;
    const showResetRoundButton = canHaveResetRoundButton;
    const showNextRoundButton = canHaveNextRoundButton && currentRoundIndex < rounds.length - 1;

    const showFooter = showPreviousRoundButton || showResetRoundButton || showNextRoundButton;

    return (
        <div className="round">
            <div className="round-content">
                <div className="round-description">{description}</div>
                {children}
            </div>
            {showFooter && (
                <footer className="round-footer">
                    <div>
                        {showPreviousRoundButton && (
                            <button
                                className="round-button round-button--previous"
                                type="button"
                                onClick={() => goToPreviousRound()}
                            >
                                &#8678; Назад
                            </button>
                        )}
                    </div>
                    <div>
                        {showResetRoundButton && (
                            <button
                                className="round-button round-button--reset"
                                type="button"
                                onClick={() => resetRound?.()}
                            >
                                &#8635; Попробуй еще раз
                            </button>
                        )}
                    </div>
                    <div>
                        {showNextRoundButton && (
                            <button
                                className="round-button round-button--next"
                                type="button"
                                onClick={() => goToNextRound()}
                            >
                                Дальше &#8680;
                            </button>
                        )}
                    </div>
                </footer>
            )}
        </div>
    );
};

export default RoundWrapper;
