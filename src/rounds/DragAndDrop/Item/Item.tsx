import { FC } from 'react';
import './Item.scss';

interface ItemProps {
    text: string;
}

const Item: FC<ItemProps> = ({ text }) => {
    return <div className="item">{text}</div>;
};

export default Item;
