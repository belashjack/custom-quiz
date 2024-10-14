import { FC, useState } from 'react';
import Button from '../../components/Button/Button';
import './ColoredText.scss';

const TEXT_COLORS = ['#ff0000', '#ff7f00', '#00ff00', '#9400d3'];

interface ColoredText {
    text: string;
}

const ColoredText: FC<ColoredText> = ({ text }) => {
    const [colorIndex, setColorIndex] = useState(0);
    const currentColor = TEXT_COLORS[colorIndex];

    return (
        <div className="colored-text-wrapper">
            <div>
                {text.split('').map((letter, index) => {
                    const color = TEXT_COLORS[index % TEXT_COLORS.length];
                    return (
                        <span
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            style={{ color, visibility: color === currentColor ? 'visible' : 'hidden' }}
                        >
                            {letter}
                        </span>
                    );
                })}
            </div>
            <Button onClick={() => setColorIndex((prevColorIndex) => (prevColorIndex + 1) % TEXT_COLORS.length)}>
                Жмяк!
            </Button>
        </div>
    );
};

export default ColoredText;
