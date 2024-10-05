import { BALLOON_COLOR } from './Balloons/Balloon/Balloon';

export enum RoundType {
    PREVIEW = 'PREVIEW',
    SIMPLE_QUIZ = 'SIMPLE_QUIZ',
    INPUT_CORRECT_ANSWER = 'INPUT_CORRECT_ANSWER',
    DRAG_AND_DROP = 'DRAG_AND_DROP',
    PRESS_BUTTON = 'PRESS_BUTTON',
    PUZZLE = 'PUZZLE',
    BALLOONS = 'BALLOONS',
    CARRY = 'CARRY',
}

export type Answer = string | number[] | boolean | null;

interface ProgressRound {
    answer: Answer;
    isLoseByTimer?: boolean;
}

export interface Progress {
    currentRoundIndex: number;
    livesLeft: number;
    rounds: Record<number, ProgressRound>;
}

export interface Explanation {
    text: string;
    asset: React.ReactNode;
}

export interface SingleOption {
    asset?: React.ReactNode;
    text?: string;
    explanation: Explanation;
}

export interface MultipleOption {
    asset?: React.ReactNode;
    text?: string;
}

export type Option = SingleOption | MultipleOption;

export interface Title {
    text: string;
    isMorseCode?: boolean;
    isUpsideDown?: boolean;
    asset?: React.ReactNode;
}

interface BaseRoundContent {
    title?: Title;
}

interface GameRoundContent extends BaseRoundContent {
    winExplanation: Explanation;
    loseExplanation: Explanation;
}

interface PreviewRoundContent extends BaseRoundContent {
    description?: React.ReactNode;
}

interface SimpleQuizRoundSingleContent extends BaseRoundContent {
    isSingleChoice: true;
    options: SingleOption[];
    correctOptionIndexes: [number];
}

interface SimpleQuizRoundMultipleContent extends GameRoundContent {
    options: MultipleOption[];
    correctOptionIndexes: number[];
}

export type SimpleQuizRoundContent = SimpleQuizRoundSingleContent | SimpleQuizRoundMultipleContent;

interface InputCorrectAnswerRoundContent extends GameRoundContent {
    correctAnswer: string[];
}

interface DragAndDropItem {
    id: number;
    text: string;
}

interface DragAndDropRoundContent extends GameRoundContent {
    options: DragAndDropItem[];
    correctOrder: number[];
}

export type Difficulty = 'EASY' | 'HARD';

interface PressButtonRoundContent extends GameRoundContent {
    difficulty: Difficulty;
}

interface PuzzleRoundContent extends GameRoundContent {
    imageUrl: string;
    difficulty: Difficulty;
}

interface BalloonsRoundContent extends Omit<GameRoundContent, 'winExplanation'> {
    difficulty: Difficulty;
    correctColor: BALLOON_COLOR;
    happyBirthdayName: string;
}

export interface DraggableDroppable {
    content: {
        text?: string;
        emoji?: string;
    };
}

export interface CarryRoundItem {
    draggable: DraggableDroppable;
    droppable: DraggableDroppable;
}

interface CarryRoundContent extends GameRoundContent {
    items: CarryRoundItem[];
}

interface TimerOptions {
    duration: number;
    loseByTimerExplanation: Explanation;
}

interface BaseRound {
    type: RoundType;
    timerOptions?: TimerOptions;
    content: BaseRoundContent;
}

export interface PreviewRound extends BaseRound {
    type: RoundType.PREVIEW;
    content: PreviewRoundContent;
}

export interface SimpleQuizRound extends BaseRound {
    type: RoundType.SIMPLE_QUIZ;
    content: SimpleQuizRoundContent;
}

export interface InputCorrectAnswerRound extends BaseRound {
    type: RoundType.INPUT_CORRECT_ANSWER;
    content: InputCorrectAnswerRoundContent;
}

export interface DragAndDropRound extends BaseRound {
    type: RoundType.DRAG_AND_DROP;
    content: DragAndDropRoundContent;
}

export interface PressButtonRound extends BaseRound {
    type: RoundType.PRESS_BUTTON;
    content: PressButtonRoundContent;
}

export interface PuzzleRound extends BaseRound {
    type: RoundType.PUZZLE;
    content: PuzzleRoundContent;
}

export interface BalloonsRound extends BaseRound {
    type: RoundType.BALLOONS;
    content: BalloonsRoundContent;
}

export interface CarryRound extends BaseRound {
    type: RoundType.CARRY;
    content: CarryRoundContent;
}

export type Round =
    | PreviewRound
    | SimpleQuizRound
    | InputCorrectAnswerRound
    | DragAndDropRound
    | PressButtonRound
    | PuzzleRound
    | BalloonsRound
    | CarryRound;
