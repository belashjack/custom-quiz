import { CORRECT_EXPLANATION_ASSETS, INCORRECT_EXPLANATION_ASSETS } from './constants';
import { BaseRoundContent, InputCorrectAnswerRoundContent, Round, RoundType, SimpleQuizRoundContent } from './types';
import { getRandomFromArray } from './utils';

const ROUND_1_CONTENT: InputCorrectAnswerRoundContent = {
    description: <p>Введи правильный ответ на вопрос: сколько мне лет?</p>,
    correctAnswer: '29',
    correctExplanation: {
        text: 'К счастью, ты хоть это знаешь! 🎉',
        asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
    },
    incorrectExplanation: {
        text: 'Капец, даже не знаешь сколько мне лет! 😱',
        asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
    },
};

const ROUND_2_CONTENT: SimpleQuizRoundContent = {
    description: (
        <p>Ты знаешь мою первую фразу при нашем знакомстве. &ldquo;Интересная&rdquo;. А какой был твой ответ?</p>
    ),
    options: [
        {
            text: 'Знать тебя не хочу',
            explanation: {
                text: 'Нет, это не правильный ответ 🙃',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        {
            text: 'Я католик',
            explanation: {
                text: 'Нет, это не правильный ответ 🙃',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        {
            text: 'Спасибо за веру в меня',
            explanation: {
                text: 'Да, это правильный ответ',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
        },
        {
            text: 'Ясно понятно',
            explanation: {
                text: 'Нет, это не правильный ответ 🙃',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
    ],
    correctOptionIndex: 2,
};

const ROUND_3_CONTENT: BaseRoundContent = {
    description: (
        <>
            <p>Привет. Это мой небольшой подарок тебе. Да, он создан специально для тебя!!! 😀</p>
            <p>Я долго думал, что подарить, и не нашёл ничего лучшего, чем подарить тебе игру.</p>
            <p>Так что устраивайся поудобнее и начинай!</p>
            <p>
                Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше начни
                когда-нибудь попозже.
            </p>
            <p>
                Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше начни
                когда-нибудь попозже.
            </p>
            <p>
                Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше начни
                когда-нибудь попозже.
            </p>
            <p>
                Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше начни
                когда-нибудь попозже.
            </p>
            <p>
                Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше начни
                когда-нибудь попозже.
            </p>
            <p>
                Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше начни
                когда-нибудь попозже.
            </p>
            <p>
                Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше начни
                когда-нибудь попозже.
            </p>
            <p>
                Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше начни
                когда-нибудь попозже.
            </p>
        </>
    ),
};

const ROUND_4_CONTENT: BaseRoundContent = {
    description: <p>Спасибо за игру!</p>,
};

export const roundsConfig: Round[] = [
    { type: RoundType.INPUT_CORRECT_ANSWER, content: ROUND_1_CONTENT },
    { type: RoundType.SIMPLE_QUIZ, content: ROUND_2_CONTENT },
    { type: RoundType.PREVIEW, content: ROUND_3_CONTENT },
    { type: RoundType.PREVIEW, content: ROUND_4_CONTENT },
];
