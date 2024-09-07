import { clsx } from 'clsx';
import { forwardRef } from 'react';
import Explanation from '../../components/Explanation/Explanation';
import { Option } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import './Option.scss';

interface OptionProps extends React.InputHTMLAttributes<HTMLInputElement> {
    option: Option;
    value: number;
    isCorrect: boolean;
    isIncorrect: boolean;
    isNotAnswered: boolean;
    disabled: boolean;
}

// eslint-disable-next-line prefer-arrow-callback
const Option = forwardRef<HTMLInputElement, OptionProps>(function Option(props, ref) {
    const { option, value, isCorrect, isIncorrect, isNotAnswered, disabled, ...rest } = props;

    const optionClasses = clsx('option', {
        'option--correct': isCorrect,
        'option--incorrect': isIncorrect,
        'option--not-answered': isNotAnswered,
    });

    return (
        <div className={optionClasses}>
            <label>
                <input ref={ref} {...rest} type="checkbox" value={value} disabled={disabled} />
                {option.text}
                {isCorrect && <FontAwesomeIcon icon={faCircleCheck} size="lg" />}
                {isIncorrect && <FontAwesomeIcon icon={faCircleXmark} size="lg" />}
            </label>
            {(isCorrect || isIncorrect) && (
                <Explanation isCorrect={isCorrect} isIncorrect={isIncorrect} {...option.explanation} />
            )}
        </div>
    );
});

export default Option;
