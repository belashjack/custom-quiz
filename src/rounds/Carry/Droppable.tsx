import { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { DraggableDroppableStateItem } from './types';
import './Carry.scss';

interface DroppableProps {
    item: DraggableDroppableStateItem;
}

const Droppable: FC<DroppableProps> = ({ item }) => {
    const { setNodeRef, isOver } = useDroppable({ id: item.id });

    return item.isHidden === true ? (
        <div className="droppable" style={{ visibility: 'hidden' }} />
    ) : (
        <div ref={setNodeRef} className={clsx('droppable', { 'droppable--over': isOver })}>
            {item.content.text !== undefined && <div className="droppable-content--text">{item.content.text}</div>}
            {item.content.emoji !== undefined && <div className="droppable-content--emoji">{item.content.emoji}</div>}
        </div>
    );
};

export default Droppable;
