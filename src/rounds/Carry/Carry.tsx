import { FC, Fragment, useEffect, useState } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { CarryRound, CarryRoundItem } from '../types';
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { shuffleArray } from '../utils';
import { CarryRoundStateItem } from './types';
import Draggable from './Draggable';
import Droppable from './Droppable';
import './Carry.scss';
import useAnswer from '../hooks/useAnswer';

const generateConfigWithIds = (items: CarryRoundItem[]): CarryRoundStateItem[] =>
    items.map((item, index) => ({
        draggable: { ...item.draggable, id: index + 1 },
        droppable: { ...item.droppable, id: index + 1 },
    }));

const getInitialState = (items: CarryRoundItem[]): CarryRoundStateItem[] => {
    const itemsWithIds = generateConfigWithIds(items);

    const randomizedDraggables = shuffleArray(itemsWithIds.map((item) => item.draggable));
    const randomizedDroppables = shuffleArray(itemsWithIds.map((item) => item.droppable));

    return randomizedDraggables.map((draggable, index) => ({
        draggable,
        droppable: randomizedDroppables[index],
    }));
};

const Carry: FC<CarryRound> = (props) => {
    const {
        content: { description, items },
    } = props;

    const winDetector = (answer: boolean) => answer;

    const { answer, answerExists, setAnswer, isWin, isLose, isLoseByTimer } = useAnswer<boolean>(winDetector);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 250, tolerance: 5 },
        }),
        useSensor(KeyboardSensor)
    );

    const [stateItems, setStateItems] = useState(getInitialState(items));

    useEffect(() => {
        if (stateItems.every(({ draggable }) => draggable.isHidden)) {
            setAnswer(true);
        }
    }, [stateItems]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over === null) return;

        if (active.id === over.id) {
            const hideItems = (items: CarryRoundStateItem[]) =>
                items.map((item) => ({
                    ...item,
                    draggable: item.draggable.id === active.id ? { ...item.draggable, isHidden: true } : item.draggable,
                    droppable: item.droppable.id === over.id ? { ...item.droppable, isHidden: true } : item.droppable,
                }));

            setStateItems((prevStateItems) => hideItems(prevStateItems));
        } else {
            setAnswer(false);
        }
    };

    const resetInternalState = () => {
        setStateItems(getInitialState(items));
    };

    const isRoundDisabled = answerExists(answer) || isLoseByTimer;

    return (
        <RoundWrapper
            description={description}
            isWin={isWin}
            isLose={isLose}
            isLoseByTimer={isLoseByTimer}
            resetRound={resetInternalState}
            forceLose={() => {
                setAnswer(null, true);
                resetInternalState();
            }}
        >
            {!isRoundDisabled && (
                <div className="carry">
                    <DndContext sensors={sensors} modifiers={[restrictToParentElement]} onDragEnd={handleDragEnd}>
                        {stateItems.map(({ draggable, droppable }, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={index}>
                                <Draggable item={draggable} />
                                <Droppable item={droppable} />
                            </Fragment>
                        ))}
                    </DndContext>
                </div>
            )}
        </RoundWrapper>
    );
};

export default Carry;
