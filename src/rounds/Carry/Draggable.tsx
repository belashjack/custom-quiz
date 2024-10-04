import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DraggableDroppableStateItem } from './types';
import './Carry.scss';

interface DraggableProps {
    item: DraggableDroppableStateItem;
}

const Draggable: FC<DraggableProps> = ({ item }) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
    });

    const style: React.CSSProperties = {
        transform: isDragging
            ? `translate3d(${transform ? transform.x : 0}px, ${transform ? transform.y : 0}px, 0) scale(1.1)`
            : `translate3d(${transform ? transform.x : 0}px, ${transform ? transform.y : 0}px, 0)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        visibility: item.isHidden === true ? 'hidden' : 'visible',
    };

    return (
        <div ref={setNodeRef} className="draggable" style={style} {...listeners} {...attributes}>
            {item.content.text !== undefined && <div className="draggable-content--text">{item.content.text}</div>}
            {item.content.emoji !== undefined && <div className="draggable-content--emoji">{item.content.emoji}</div>}
        </div>
    );
};

export default Draggable;
