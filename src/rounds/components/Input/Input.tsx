import { forwardRef } from 'react';
import clsx from 'clsx';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    isCorrect?: boolean;
    isIncorrect?: boolean;
}

// eslint-disable-next-line prefer-arrow-callback
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
    const { hasError, isCorrect, isIncorrect, ...rest } = props;

    return (
        <label className="input-label">
            <input
                {...rest}
                ref={ref}
                className={clsx('input', {
                    'input--error': hasError,
                    'input--correct': isCorrect,
                    'input--incorrect': isIncorrect,
                })}
                type="text"
            />
        </label>
    );
});

export default Input;
