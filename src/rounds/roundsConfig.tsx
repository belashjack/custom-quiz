import { CORRECT_EXPLANATION_ASSETS, INCORRECT_EXPLANATION_ASSETS } from './constants';
import { Round, RoundType } from './types';
import { getRandomFromArray } from './utils';

export const roundsConfig: Round[] = [
    // single choice, without asset
    {
        type: RoundType.SIMPLE_QUIZ,
        content: {
            isSingleChoice: true,
            description: {
                text: <p>Вкусный?</p>,
                asset: <img src={new URL('./assets/2024-09-07 14.08.27.jpg', import.meta.url).href} />,
            },
            options: [
                {
                    text: 'Да',
                    explanation: {
                        text: 'Ага, вкуснятина, спасибо за совет 😋',
                        asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
                    },
                },
                {
                    text: 'Нет',
                    explanation: {
                        text: 'Да нет же, вкусный был, не ври 😏',
                        asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
                    },
                },
            ],
            correctOptionIndexes: [0],
        },
    },
    // single choice, with asset
    {
        type: RoundType.SIMPLE_QUIZ,
        content: {
            isSingleChoice: true,
            description: {
                text: <p>Вкусный?</p>,
                asset: <img src={new URL('./assets/2024-09-07 14.08.27.jpg', import.meta.url).href} />,
            },
            options: [
                {
                    explanation: {
                        text: 'Ага, вкуснятина, спасибо за совет 😋',
                        asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
                    },
                    asset: <img src={new URL('./assets/2024-09-07 14.08.27.jpg', import.meta.url).href} />,
                },
                {
                    text: 'Нет',
                    explanation: {
                        text: 'Да нет же, вкусный был, не ври 😏',
                        asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
                    },
                    asset: <img src={new URL('./assets/correctAnswers/image3.webp', import.meta.url).href} />,
                },
                {
                    text: 'Нет же, как можно вообще подумать что он может быть вкусный, не понимаю',
                    explanation: {
                        text: 'Да нет же, вкусный был, не ври 😏 Да нет же, вкусный был, не ври Да нет же, вкусный был, не ври Да нет же, вкусный был, не ври',
                        asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
                    },
                },
                {
                    text: 'Нет же 2',
                    explanation: {
                        text: 'Да нет же, вкусный был, не ври 😏',
                        asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
                    },
                    asset: <img src={new URL('./assets/correctAnswers/image3.webp', import.meta.url).href} />,
                },
            ],
            correctOptionIndexes: [0],
        },
    },
    // multiple choice, without asset
    {
        type: RoundType.SIMPLE_QUIZ,
        content: {
            description: {
                text: (
                    <p>
                        Ты знаешь мою первую фразу при нашем знакомстве. &ldquo;Интересная&rdquo;. А какой был твой
                        ответ?
                    </p>
                ),
            },
            options: [
                { text: 'Знать тебя не хочу' },
                { text: 'Я католик' },
                { text: 'Спасибо за веру в меня' },
                { text: 'Ясно понятно' },
            ],
            winExplanation: {
                text: 'К счастью, ты хоть это знаешь! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            loseExplanation: {
                text: 'Капец, даже не знаешь сколько мне лет! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
            correctOptionIndexes: [2, 3],
        },
    },
    // multiple choice, with asset
    {
        type: RoundType.SIMPLE_QUIZ,
        content: {
            description: {
                text: (
                    <p>
                        Ты знаешь мою первую фразу при нашем знакомстве. &ldquo;Интересная&rdquo;. А какой был твой
                        ответ?
                    </p>
                ),
            },
            options: [
                {
                    text: 'Знать тебя не хочу',
                    asset: <img src={new URL('./assets/2024-09-07 14.12.32.jpg', import.meta.url).href} />,
                },
                { text: 'Я католик' },
                { text: 'Спасибо за веру в меня' },
                {
                    text: 'Ясно понятно',
                    asset: <img src={new URL('./assets/2024-09-07 14.08.27.jpg', import.meta.url).href} />,
                },
            ],
            winExplanation: {
                text: 'К счастью, ты хоть это знаешь! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            loseExplanation: {
                text: 'Капец, даже не знаешь сколько мне лет! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
            correctOptionIndexes: [2, 3],
        },
    },
    {
        type: RoundType.INPUT_CORRECT_ANSWER,
        content: {
            description: {
                text: <p>В каком городе я сделал это фото? Да да, я хочу узнать место</p>,
                asset: <img src={new URL('./assets/2024-09-07 14.12.32.jpg', import.meta.url).href} />,
            },
            correctAnswer: ['Дубай', 'Dubai'],
            winExplanation: { text: 'Верно! Это Дубай! 🎉', asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS) },
            loseExplanation: {
                text: 'Нет, ну ведь на фотке же известное место! 🤦‍♂️',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
    },
    {
        type: RoundType.INPUT_CORRECT_ANSWER,
        content: {
            description: { text: <p>Введи правильный ответ на вопрос: сколько мне лет?</p> },
            correctAnswer: ['29'],
            winExplanation: {
                text: 'К счастью, ты хоть это знаешь! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            loseExplanation: {
                text: 'Капец, даже не знаешь сколько мне лет! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
    },
    {
        type: RoundType.PREVIEW,
        content: {
            description: {
                text: (
                    <>
                        <p>Привет. Это мой небольшой подарок тебе. Да, он создан специально для тебя!!! 😀</p>
                        <p>Я долго думал, что подарить, и не нашёл ничего лучшего, чем подарить тебе игру.</p>
                        <p>Так что устраивайся поудобнее и начинай!</p>
                        <p>
                            Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше
                            начни когда-нибудь попозже.
                        </p>
                        <p>
                            Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше
                            начни когда-нибудь попозже.
                        </p>
                        <p>
                            Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше
                            начни когда-нибудь попозже.
                        </p>
                        <p>
                            Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше
                            начни когда-нибудь попозже.
                        </p>
                        <p>
                            Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше
                            начни когда-нибудь попозже.
                        </p>
                        <p>
                            Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше
                            начни когда-нибудь попозже.
                        </p>
                        <p>
                            Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше
                            начни когда-нибудь попозже.
                        </p>
                        <p>
                            Внимание! Запрещёно заходить с плохим настроением! Если у тебя плохое настроение, но лучше
                            начни когда-нибудь попозже.
                        </p>
                    </>
                ),
            },
        },
    },
    {
        type: RoundType.PREVIEW,
        content: {
            description: { text: <p>Спасибо за игру!</p> },
        },
    },
];
