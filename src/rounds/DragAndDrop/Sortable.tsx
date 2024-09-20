import { FC, PropsWithChildren } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableProps extends PropsWithChildren {
    id: number;
    isDragging: boolean;
}

const Sortable: FC<SortableProps> = ({ id, isDragging, children }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

export default Sortable;
