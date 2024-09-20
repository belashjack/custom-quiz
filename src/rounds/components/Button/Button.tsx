import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import './Button.scss';

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: JSX.Element;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
    isSubmitButton?: boolean;
}

const Button: FC<ButtonProps> = ({
    children,
    icon,
    iconPosition = 'left',
    isSubmitButton = false,
    onClick,
    ...rest
}) => {
    return (
        <button {...rest} className="button" type={isSubmitButton ? 'submit' : 'button'} onClick={onClick}>
            {iconPosition === 'left' && icon && <>{icon}&nbsp;</>}
            {children}
            {iconPosition === 'right' && icon && <>&nbsp;{icon}</>}
        </button>
    );
};

export default Button;
