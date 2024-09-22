import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import './Button.scss';
import withHeartAnimation, { WithHeartAnimationProps } from '../withHeartAnimation/withHeartAnimation';
import clsx from 'clsx';

interface ButtonProps extends PropsWithChildren, WithHeartAnimationProps, ButtonHTMLAttributes<HTMLButtonElement> {
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
    className,
    onClick,
    ...rest
}) => {
    return (
        <button
            {...rest}
            className={clsx('button', className)}
            type={isSubmitButton ? 'submit' : 'button'}
            onClick={onClick}
        >
            {iconPosition === 'left' && icon && <>{icon}&nbsp;</>}
            {children}
            {iconPosition === 'right' && icon && <>&nbsp;{icon}</>}
        </button>
    );
};

export default withHeartAnimation(Button);
