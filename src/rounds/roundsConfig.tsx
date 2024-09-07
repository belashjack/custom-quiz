import { CORRECT_EXPLANATION_ASSETS, INCORRECT_EXPLANATION_ASSETS } from './constants';
import { Round, RoundType } from './types';
import { getRandomFromArray } from './utils';

export const roundsConfig: Round[] = [
    {
        type: RoundType.SIMPLE_QUIZ,
        content: {
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
            correctOptionIndex: 0,
        },
    },
    {
        type: RoundType.INPUT_CORRECT_ANSWER,
        content: {
            description: {
                text: <p>В каком городе я сделал это фото? Да да, я хочу узнать место</p>,
                asset: <img src={new URL('./assets/2024-09-07 14.12.32.jpg', import.meta.url).href} />,
            },
            correctAnswers: ['Дубай', 'Dubai'],
            correctExplanation: {
                text: 'Верно! Это Дубай! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            incorrectExplanation: {
                text: 'Нет, ну ведь на фотке же известное место! 🤦‍♂️',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
    },
    {
        type: RoundType.INPUT_CORRECT_ANSWER,
        content: {
            description: {
                text: <p>Введи правильный ответ на вопрос: сколько мне лет?</p>,
            },
            correctAnswers: ['29'],
            correctExplanation: {
                text: 'К счастью, ты хоть это знаешь! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            incorrectExplanation: {
                text: 'Капец, даже не знаешь сколько мне лет! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
    },
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
            description: {
                text: <p>Спасибо за игру!</p>,
            },
        },
    },
];
