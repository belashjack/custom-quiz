import { FC, useState } from 'react';
import { DragAndDropRound } from '../types';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Sortable from './Sortable';
import Item from './Item/Item';
import './DragAndDrop.scss';
import { areArraysEqual } from '../utils';
import useAnswer from '../hooks/useAnswer';
import Button from '../components/Button/Button';
import clsx from 'clsx';
import Explanation from '../components/Explanation/Explanation';

const DragAndDrop: FC<DragAndDropRound> = (props) => {
    const {
        content: { description, options, correctOrder, winExplanation, loseExplanation },
    } = props;
    const [activeId, setActiveId] = useState<number | null>(null);
    const [items, setItems] = useState(options);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const winDetector = (answer: number[]) => {
        return areArraysEqual(answer, correctOrder);
    };

    const { answer, answerExists, setAnswer, isWin, isLose } = useAnswer<number[]>(winDetector);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { id } = active;

        setActiveId(Number(id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveId(null);

        if (over?.id === undefined) return null;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === Number(active.id));
                const newIndex = items.findIndex((item) => item.id === Number(over.id));

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleResetRound = () => {
        setItems(options);
    };

    const activeItem = items.find((item) => item.id === activeId);
    const isSortingDisabled = answerExists(answer);

    return (
        <RoundWrapper
            description={description}
            showResetRoundButton={isLose}
            showNextRoundButton={isWin}
            resetRound={handleResetRound}
        >
            <div className="drag-and-drop">
                <DndContext
                    sensors={sensors}
                    onDragCancel={() => {
                        setActiveId(null);
                    }}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext disabled={isSortingDisabled} items={items} strategy={verticalListSortingStrategy}>
                        <div className={clsx('sortable-items', { 'sortable-items--disabled': isSortingDisabled })}>
                            {items.map((item) => (
                                <Sortable key={item.id} id={item.id} isDragging={activeId === item.id}>
                                    <Item text={item.text} />
                                </Sortable>
                            ))}
                        </div>
                    </SortableContext>
                    <DragOverlay>{activeItem ? <Item text={activeItem.text} /> : null}</DragOverlay>
                </DndContext>
                {!answerExists(answer) && (
                    <Button onClick={() => setAnswer(items.map((item) => item.id))}>Ответить</Button>
                )}
                {isWin && <Explanation isCorrect {...winExplanation} />}
                {isLose && <Explanation isIncorrect {...loseExplanation} />}
            </div>
        </RoundWrapper>
    );
};

export default DragAndDrop;
