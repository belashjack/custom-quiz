export enum RoundType {
    PREVIEW = 'PREVIEW',
    SIMPLE_QUIZ = 'SIMPLE_QUIZ',
    INPUT_CORRECT_ANSWER = 'INPUT_CORRECT_ANSWER',
}

interface BaseOption {
    text: string;
    explanation: string;
}

export interface BaseRoundContent {
    description: React.ReactNode;
}

export interface SimpleQuizRoundContent extends BaseRoundContent {
    options: BaseOption[];
    correctOptionIndex: number;
}

export interface InputCorrectAnswerRoundContent extends BaseRoundContent {
    correctAnswer: string;
    correctExplanation: string;
    incorrectExplanation: string;
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

export type Round = PreviewRound | SimpleQuizRound | InputCorrectAnswerRound;
