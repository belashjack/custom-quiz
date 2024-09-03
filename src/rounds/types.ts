export enum RoundType {
    PREVIEW = 'PREVIEW',
    SIMPLE_QUIZ = 'SIMPLE_QUIZ',
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

export type Round = PreviewRound | SimpleQuizRound;
