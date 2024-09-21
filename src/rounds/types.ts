export enum RoundType {
    PREVIEW = 'PREVIEW',
    SIMPLE_QUIZ = 'SIMPLE_QUIZ',
    INPUT_CORRECT_ANSWER = 'INPUT_CORRECT_ANSWER',
    DRAG_AND_DROP = 'DRAG_AND_DROP',
    PRESS_BUTTON = 'PRESS_BUTTON',
}

export type Answer = string | number[] | boolean | null;
export interface Progress {
    currentRoundIndex: number;
    livesLeft: number;
    answers: Record<number, Answer>;
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

export interface Description {
    text: React.ReactNode;
    asset?: React.ReactNode;
}

interface BaseRoundContent {
    description: Description;
}

interface SimpleQuizRoundSingleContent extends BaseRoundContent {
    isSingleChoice: true;
    options: SingleOption[];
    correctOptionIndexes: [number];
}

interface SimpleQuizRoundMultipleContent extends BaseRoundContent {
    options: MultipleOption[];
    winExplanation: Explanation;
    loseExplanation: Explanation;
    correctOptionIndexes: number[];
}

export type SimpleQuizRoundContent = SimpleQuizRoundSingleContent | SimpleQuizRoundMultipleContent;

interface InputCorrectAnswerRoundContent extends BaseRoundContent {
    correctAnswer: string[];
    winExplanation: Explanation;
    loseExplanation: Explanation;
}

interface DragAndDropItem {
    id: number;
    text: string;
}

interface DragAndDropRoundContent extends BaseRoundContent {
    options: DragAndDropItem[];
    correctOrder: number[];
    winExplanation: Explanation;
    loseExplanation: Explanation;
}

export type DIFFICULTY = 'EASY' | 'HARD';

interface PressButtonRoundContent extends BaseRoundContent {
    difficulty: DIFFICULTY;
}

interface BaseRound {
    type: RoundType;
    content: BaseRoundContent;
}

export interface PreviewRound extends BaseRound {
    type: RoundType.PREVIEW;
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

export type Round = PreviewRound | SimpleQuizRound | InputCorrectAnswerRound | DragAndDropRound | PressButtonRound;
