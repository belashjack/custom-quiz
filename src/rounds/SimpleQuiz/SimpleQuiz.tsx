import { FC, Fragment, useEffect } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { MultipleOption, SimpleQuizRound, SingleOption } from '../types';
import './SimpleQuiz.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAnswer from '../hooks/useAnswer';
import Option from './Option/Option';
import { doArraysContainSameValues } from '../utils';
import Button from '../components/Button/Button';
import Explanation from '../components/Explanation/Explanation';
import clsx from 'clsx';

interface SimpleQuizFormFields {
    option: string[];
}

const SimpleQuiz: FC<SimpleQuizRound> = (props) => {
    const { content } = props;
    const { description, correctOptionIndexes } = content;
    const winDetector = (answer: number[]) => {
        return doArraysContainSameValues(correctOptionIndexes, answer);
    };

    const { answer, answerExists, setAnswer, isWin, isLose } = useAnswer<number[]>(winDetector);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm<SimpleQuizFormFields>({
        defaultValues: { option: [] },
    });

    if (correctOptionIndexes.length === 0) {
        throw new Error('SimpleQuiz round must have at least one correct option');
    }

    const isSingleChoice = 'isSingleChoice' in content;

    const watchedOptionValue = watch('option');

    const valueExists = watchedOptionValue.length > 0;

    useEffect(() => {
        if (isSingleChoice && valueExists) {
            setAnswer(watchedOptionValue.map((value) => Number(value)));
        }
    }, [watchedOptionValue]);

    const onSubmit: SubmitHandler<SimpleQuizFormFields> = () => {
        setAnswer(watchedOptionValue.map((value) => Number(value)));
    };

    const handleResetRound = () => {
        reset();
    };

    const singleChoiceOptionsRenderer = (options: SingleOption[]) => {
        const atLeastOneOptionHasAsset = options.some((option) => 'asset' in option);

        return (
            <div className={clsx('options', { 'options--with-asset': atLeastOneOptionHasAsset })}>
                {options.map((option, index) => {
                    const isSelected = answerExists(answer) && index === answer[0];
                    const isNotSelected = answerExists(answer) && !isSelected;
                    const isCorrect = isWin && correctOptionIndexes.includes(index);
                    const isIncorrect = isLose && isSelected;

                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={index}>
                            <Option
                                {...register('option')}
                                option={option}
                                value={index}
                                isNotSelected={isNotSelected}
                                isCorrect={isCorrect}
                                isIncorrect={isIncorrect}
                                disabled={answerExists(answer)}
                            />
                            {(isCorrect || isIncorrect) && (
                                <Explanation isCorrect={isCorrect} isIncorrect={isIncorrect} {...option.explanation} />
                            )}
                        </Fragment>
                    );
                })}
            </div>
        );
    };

    const multipleChoiceOptionsRenderer = (options: MultipleOption[]) => {
        const atLeastOneOptionHasAsset = options.some((option) => 'asset' in option);

        return (
            <div className={clsx('options', { 'options--with-asset': atLeastOneOptionHasAsset })}>
                {options.map((option, index) => {
                    const isSelected = valueExists && watchedOptionValue.map((value) => Number(value)).includes(index);
                    const isNotSelected = answerExists(answer) && !isSelected;
                    const isCorrect = isWin && correctOptionIndexes.includes(index);

                    return (
                        <Option
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            {...register('option', {
                                validate: (value) => value.length > 0,
                            })}
                            option={option}
                            value={index}
                            isCorrect={isCorrect}
                            isSelected={isSelected}
                            isNotSelected={isNotSelected}
                            disabled={answerExists(answer)}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <RoundWrapper
            description={description}
            canHaveResetRoundButton={isLose}
            canHaveNextRoundButton={isWin}
            resetRound={handleResetRound}
        >
            {isSingleChoice && <form className="simple-quiz-form">{singleChoiceOptionsRenderer(content.options)}</form>}
            {!isSingleChoice && (
                <form
                    className="simple-quiz-form simple-quiz-form--multiple"
                    onSubmit={(e) => {
                        void handleSubmit(onSubmit)(e);
                    }}
                >
                    {multipleChoiceOptionsRenderer(content.options)}
                    {isWin && <Explanation isCorrect {...content.winExplanation} />}
                    {isLose && <Explanation isIncorrect {...content.loseExplanation} />}
                    {errors.option && <p className="error-message">Выбери хотя бы один вариант</p>}
                    {!answerExists(answer) && <Button isSubmitButton>Ответить</Button>}
                </form>
            )}
        </RoundWrapper>
    );
};

export default SimpleQuiz;
