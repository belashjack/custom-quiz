import { CarryRoundItem, DraggableDroppable } from '../types';

export interface DraggableDroppableStateItem extends DraggableDroppable {
    id: number;
    isHidden?: boolean;
}

export interface CarryRoundStateItem extends CarryRoundItem {
    draggable: DraggableDroppableStateItem;
    droppable: DraggableDroppableStateItem;
}
