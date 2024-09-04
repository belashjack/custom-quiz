import { FC, PropsWithChildren } from 'react';
import './Button.scss';

interface ButtonProps extends PropsWithChildren {
    icon: JSX.Element;
    iconPosition?: 'left' | 'right';
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ children, icon, iconPosition = 'left', onClick }) => {
    return (
        <button className="button" type="button" onClick={onClick}>
            {iconPosition === 'left' && <>{icon}&nbsp;</>}
            {children}
            {iconPosition === 'right' && <>&nbsp;{icon}</>}
        </button>
    );
};

export default Button;
