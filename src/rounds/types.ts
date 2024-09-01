export enum RoundType {
    PREVIEW = 'PREVIEW',
    SIMPLE_QUIZ = 'SIMPLE_QUIZ',
}

export interface BaseRoundContent {
    description: React.ReactNode;
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
}

export type Round = PreviewRound | SimpleQuizRound;
