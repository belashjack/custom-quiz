import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { Option } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import './Option.scss';

interface OptionProps extends React.InputHTMLAttributes<HTMLInputElement> {
    option: Option;
    value: number;
    isSelected?: boolean;
    isNotSelected: boolean;
    isCorrect: boolean;
    isIncorrect?: boolean;
    disabled: boolean;
}

// eslint-disable-next-line prefer-arrow-callback
const Option = forwardRef<HTMLInputElement, OptionProps>(function Option(props, ref) {
    const { option, value, isSelected, isNotSelected, isCorrect, isIncorrect = false, disabled, ...rest } = props;

    const optionClasses = clsx('option', {
        'option--selected': isSelected,
        'option--not-selected': isNotSelected,
        'option--correct': isCorrect,
        'option--incorrect': isIncorrect,
    });

    return (
        <label className={optionClasses}>
            <input ref={ref} {...rest} type="checkbox" value={value} disabled={disabled} />
            {option.text}
            {isCorrect && <FontAwesomeIcon icon={faCircleCheck} size="lg" />}
            {isIncorrect && <FontAwesomeIcon icon={faCircleXmark} size="lg" />}
        </label>
    );
});

export default Option;
