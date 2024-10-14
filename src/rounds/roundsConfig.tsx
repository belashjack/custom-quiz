import { BALLOON_COLOR } from './Balloons/Balloon/Balloon';
import { CORRECT_EXPLANATION_ASSETS, DEFAULT_TIMER_DURATION, INCORRECT_EXPLANATION_ASSETS } from './constants';
import { Round, RoundType } from './types';
import { getRandomFromArray } from './utils';

export const roundsConfig: Round[] = [
    // carry
    {
        type: RoundType.CARRY,
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            title: {
                text: 'Я думаю догадаешься 🙃',
            },
            winExplanation: {
                text: 'Ты справилась! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            loseExplanation: {
                text: 'Ты не справилась! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
            items: [
                { draggable: { content: { emoji: '❤️' } }, droppable: { content: { emoji: '🧠' } } },
                { draggable: { content: { text: 'абидки' } }, droppable: { content: { emoji: '🗑️' } } },
                { draggable: { content: { emoji: '🚁' } }, droppable: { content: { emoji: '👩🏻‍⚕️' } } },
            ],
        },
    },
    // balloons
    {
        type: RoundType.BALLOONS,
        content: {
            title: {
                text: 'Красный! 🎈',
            },
            correctColor: BALLOON_COLOR.RED,
            loseExplanation: {
                text: 'Ты не справилась! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
            difficulty: 'EASY',
            happyBirthdayName: 'Diana',
        },
    },
    // puzzle
    {
        type: RoundType.PUZZLE,
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            title: {
                text: 'Соберись, тряпка! 🧩',
            },
            imageUrl: 'https://custom-quiz-assets.s3.amazonaws.com/config1/content/ponchik.jpg',
            winExplanation: {
                text: 'Ты справилась! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            loseExplanation: {
                text: 'Ты не справилась! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
            difficulty: 'EASY',
        },
    },
    // press button
    {
        type: RoundType.PRESS_BUTTON,
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            title: {
                text: 'Если вещи, который ты очень любишь. Например булочки. Нам очень нужно показать это, потому что булочки этого заслуживают. Покажи свою любовь!!! 🥐',
                isUpsideDown: true,
                asset: <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/content/ponchik.jpg" />,
            },
            difficulty: 'EASY',
            winExplanation: {
                text: 'Ты справилась! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            loseExplanation: {
                text: 'Ты не справилась! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
    },
    // drag and drop
    {
        type: RoundType.DRAG_AND_DROP,
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            title: {
                text: 'Поставь в хронологическом порядке 🕰️',
            },
            options: [
                { id: 1, text: 'Мы встретились' },
                { id: 2, text: 'Я поехал в Грецию' },
                { id: 3, text: 'Ты подарила мне тапки' },
                { id: 4, text: 'Ты поехала в Польшу' },
                { id: 5, text: 'Месси перешёл в Майами, А Роналду в Аль-Наср' },
                { id: 6, text: 'Прошли Олимпийские игры в Париже' },
                {
                    id: 7,
                    text: 'Рандомный длинный текст. Рандомный длинный текст. Рандомный длинный текст. Рандомный длинный текст. Рандомный длинный текст. Рандомный длинный текст. ',
                },
            ],
            correctOrder: [7, 1, 2, 3, 4, 5, 6],
            winExplanation: {
                text: 'К счастью, ты хоть это знаешь! 🎉',
                asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
            },
            loseExplanation: {
                text: 'Капец, даже не знаешь порядок! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
    },
    // single choice, without asset
    {
        type: RoundType.SIMPLE_QUIZ,
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            isSingleChoice: true,
            title: {
                text: 'Вкусный? 🤔',
                asset: <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/content/ponchik.jpg" />,
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
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            isSingleChoice: true,
            title: {
                text: 'Вкусный? 🤔',
                asset: <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/content/ponchik.jpg" />,
            },
            options: [
                {
                    explanation: {
                        text: 'Ага, вкуснятина, спасибо за совет 😋',
                        asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS),
                    },
                    asset: <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/content/ponchik.jpg" />,
                },
                {
                    text: 'Нет',
                    explanation: {
                        text: 'Да нет же, вкусный был, не ври 😏',
                        asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
                    },
                    asset: (
                        <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/incorrectAnswers/image2.webp" />
                    ),
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
                    asset: (
                        <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/incorrectAnswers/image3.webp" />
                    ),
                },
            ],
            correctOptionIndexes: [0],
        },
    },
    // multiple choice, without asset
    {
        type: RoundType.SIMPLE_QUIZ,
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            title: {
                text: `Ты знаешь мою первую фразу при нашем знакомстве. "Интересная". А какой был твой ответ?`,
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
            title: {
                text: `Ты знаешь мою первую фразу при нашем знакомстве. "Интересная". А какой был твой ответ?`,
            },
            options: [
                {
                    text: 'Знать тебя не хочу',
                    asset: <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/content/dubai.jpg" />,
                },
                { text: 'Я католик' },
                { text: 'Спасибо за веру в меня' },
                {
                    text: 'Ясно понятно',
                    asset: <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/content/ponchik.jpg" />,
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
    // input correct answer
    {
        type: RoundType.INPUT_CORRECT_ANSWER,
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            title: {
                text: `What is your sister's name?`,
                isMorseCode: true,
                asset: <img src="https://custom-quiz-assets.s3.amazonaws.com/config1/content/dubai.jpg" />,
            },
            correctAnswer: ['Дубай', 'Dubai'],
            winExplanation: { text: 'Верно! Это Дубай! 🎉', asset: getRandomFromArray(CORRECT_EXPLANATION_ASSETS) },
            loseExplanation: {
                text: 'Нет, ну ведь на фотке же известное место! 🤦‍♂️',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
    },
    // input correct answer
    {
        type: RoundType.INPUT_CORRECT_ANSWER,
        timerOptions: {
            duration: DEFAULT_TIMER_DURATION,
            loseByTimerExplanation: {
                text: 'Время вышло! 😱',
                asset: getRandomFromArray(INCORRECT_EXPLANATION_ASSETS),
            },
        },
        content: {
            title: { text: 'Введи правильный ответ на вопрос: сколько мне лет?' },
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
    // preview
    {
        type: RoundType.PREVIEW,
        content: {
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
        },
    },
    // preview
    {
        type: RoundType.PREVIEW,
        content: {
            title: {
                text: 'Спасибо за игру! 🤗',
            },
        },
    },
];
