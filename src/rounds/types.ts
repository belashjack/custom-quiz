export enum RoundType {
    PREVIEW = 'PREVIEW',
    SIMPLE_QUIZ = 'SIMPLE_QUIZ',
    INPUT_CORRECT_ANSWER = 'INPUT_CORRECT_ANSWER',
}

export type Answer = number | string | null;

export interface Explanation {
    text: string;
    asset: React.ReactNode;
}

export interface Option {
    text: string;
    explanation: Explanation;
}

export interface Description {
    text: React.ReactNode;
    asset?: React.ReactNode;
}

export interface BaseRoundContent {
    description: Description;
}

export interface SimpleQuizRoundContent extends BaseRoundContent {
    options: Option[];
    correctOptionIndex: number;
}

export interface InputCorrectAnswerRoundContent extends BaseRoundContent {
    correctAnswers: string[];
    correctExplanation: Explanation;
    incorrectExplanation: Explanation;
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
