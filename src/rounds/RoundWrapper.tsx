import { FC, PropsWithChildren, useContext } from 'react';
import { AppContext } from '../AppContext';
import './rounds.scss';

interface RoundWrapperProps extends PropsWithChildren {
    showNextRoundButton?: boolean;
}

const RoundWrapper: FC<RoundWrapperProps> = ({
    children,
    showNextRoundButton = true,
}) => {
    const { rounds, currentRoundIndex, goToPreviousRound, goToNextRound } =
        useContext(AppContext);

    return (
        <div className="round-wrapper">
            <div className="round-content">{children}</div>
            <footer className="round-footer">
                {currentRoundIndex > 0 && (
                    <button
                        className="round-button"
                        type="button"
                        onClick={() => goToPreviousRound()}
                    >
                        Назад
                    </button>
                )}
                {currentRoundIndex < rounds.length - 1 &&
                    showNextRoundButton && (
                        <button
                            className="round-button round-button-next"
                            type="button"
                            onClick={() => goToNextRound()}
                        >
                            Дальше
                        </button>
                    )}
            </footer>
        </div>
    );
};

export default RoundWrapper;
