import { forwardRef } from 'react';
import clsx from 'clsx';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

// eslint-disable-next-line prefer-arrow-callback
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
    const { hasError, ...rest } = props;

    return (
        <label className="input-label">
            <input ref={ref} className={clsx('input', { 'input--error': hasError })} type="text" {...rest} />
        </label>
    );
});

export default Input;
