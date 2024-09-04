import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Button';
import RoundWrapper from '../RoundWrapper';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import './GameOver.scss';

const GameOver = () => {
    const { startAgain } = useContext(AppContext);

    return (
        <RoundWrapper description="Гейм овер">
            <div className="game-over">
                <div>😢</div>
                <Button icon={<FontAwesomeIcon icon={faRepeat} />} onClick={startAgain}>
                    Начни игру заново
                </Button>
            </div>
        </RoundWrapper>
    );
};

export default GameOver;
