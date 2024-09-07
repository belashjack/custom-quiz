import { FC, useContext, useEffect, useState } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { SimpleQuizRound } from '../types';
import './SimpleQuiz.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { AppContext } from '../../AppContext';
import Explanation from '../components/Explanation/Explanation';

interface SimpleQuizFormFields {
    option: string[];
}

const SimpleQuiz: FC<SimpleQuizRound> = (props) => {
    const {
        content: { description, correctOptionIndex, options },
    } = props;
    const { killLife, isEasyMode } = useContext(AppContext);
    const { register, handleSubmit, reset } = useForm<SimpleQuizFormFields>();
    const [answer, setAnswer] = useState<number | null>(null);

    const answerExists = answer !== null;
    const isLose = answerExists && answer !== correctOptionIndex;

    useEffect(() => {
        if (!isEasyMode && isLose) {
            killLife();
        }
    }, [answer]);

    const onSubmit: SubmitHandler<SimpleQuizFormFields> = (data) => {
        const { option } = data;
        setAnswer(Number(option));
    };

    const handleResetRound = () => {
        setAnswer(null);
        reset();
    };

    const isFormDisabled = answerExists;
    const isWin = answerExists && answer === correctOptionIndex;

    return (
        <RoundWrapper
            description={description}
            canHaveResetRoundButton={isLose}
            canHaveNextRoundButton={isWin}
            resetRound={handleResetRound}
        >
            <form
                className="simple-quiz-form"
                onChange={(e) => {
                    void handleSubmit(onSubmit)(e);
                }}
            >
                {options.map((option, index) => {
                    const isAnsweredOption = index === answer;
                    const isCorrectlyAnsweredOption = isAnsweredOption && index === correctOptionIndex;
                    const isIncorrectlyAnsweredOption = isAnsweredOption && index !== correctOptionIndex;

                    const optionClasses = clsx('option', {
                        'option--correct': isCorrectlyAnsweredOption,
                        'option--incorrect': isIncorrectlyAnsweredOption,
                        'option--not-answered': answerExists && !isAnsweredOption,
                    });

                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div className={optionClasses} key={index}>
                            <label>
                                <input
                                    {...register('option')}
                                    type="checkbox"
                                    value={index}
                                    disabled={isFormDisabled}
                                />
                                {option.text}
                                {isCorrectlyAnsweredOption && <FontAwesomeIcon icon={faCircleCheck} size="lg" />}
                                {isIncorrectlyAnsweredOption && <FontAwesomeIcon icon={faCircleXmark} size="lg" />}
                            </label>
                            {isAnsweredOption && (
                                <Explanation
                                    isCorrect={isCorrectlyAnsweredOption}
                                    isIncorrect={isIncorrectlyAnsweredOption}
                                    {...option.explanation}
                                />
                            )}
                        </div>
                    );
                })}
            </form>
        </RoundWrapper>
    );
};

export default SimpleQuiz;
