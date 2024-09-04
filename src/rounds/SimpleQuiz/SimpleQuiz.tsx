import { FC, useContext, useEffect, useRef, useState } from 'react';
import RoundWrapper from '../RoundWrapper';
import { SimpleQuizRound } from '../types';
import './SimpleQuiz.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import myExampleImage from '../assets/example.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { AppContext } from '../../AppContext';

interface SimpleQuizFormFields {
    option: string[];
}

const SimpleQuiz: FC<SimpleQuizRound> = (props) => {
    const { content } = props;
    const { description, correctOptionIndex, options } = content;
    const { killLife, isEasyMode } = useContext(AppContext);
    const { register, handleSubmit, reset } = useForm<SimpleQuizFormFields>();
    const [answer, setAnswer] = useState<number | null>(null);
    const explanationRef = useRef<HTMLDivElement>(null);

    const answerExists = answer !== null;
    const isLose = answerExists && answer !== correctOptionIndex;

    useEffect(() => {
        if (answerExists) {
            explanationRef.current?.scrollIntoView({ block: 'center' });
        }

        if (!isEasyMode && isLose) {
            killLife();
        }
    }, [answer]);

    const onSubmit: SubmitHandler<SimpleQuizFormFields> = (data) => {
        const { option } = data;
        setAnswer(Number(option));
    };

    const handleChange = () => {
        void handleSubmit(onSubmit)();
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
            <form className="simple-quiz-form" onChange={handleChange}>
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
                                <div className="option-explanation" ref={explanationRef}>
                                    <img src={myExampleImage} alt="" width={160} />
                                    {option.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}
            </form>
        </RoundWrapper>
    );
};

export default SimpleQuiz;
