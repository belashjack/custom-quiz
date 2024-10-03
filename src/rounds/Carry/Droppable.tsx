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
            {item.content}
        </div>
    );
};

export default Droppable;
