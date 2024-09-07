import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Button/Button';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import './GameOver.scss';

const GameOver = () => {
    const { startAgain } = useContext(AppContext);

    return (
        <RoundWrapper description={{ text: 'Гейм овер 😢' }}>
            <div className="game-over">
                <Button icon={<FontAwesomeIcon icon={faRepeat} />} onClick={startAgain}>
                    Начни игру заново
                </Button>
            </div>
        </RoundWrapper>
    );
};

export default GameOver;
