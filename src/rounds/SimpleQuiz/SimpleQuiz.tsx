import { FC } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { SimpleQuizRound } from '../types';
import './SimpleQuiz.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAnswer from '../hooks/useAnswer';
import Option from './Option/Option';

interface SimpleQuizFormFields {
    option: string[];
}

const SimpleQuiz: FC<SimpleQuizRound> = (props) => {
    const {
        content: { description, correctOptionIndex, options },
    } = props;
    const { register, handleSubmit, reset } = useForm<SimpleQuizFormFields>();

    const winDetector = (answer: number) => {
        return answer === correctOptionIndex;
    };

    const { answer, answerExists, giveAnswer, isWin, isLose } = useAnswer<number>(winDetector);

    const onSubmit: SubmitHandler<SimpleQuizFormFields> = ({ option }) => {
        giveAnswer(Number(option));
    };

    const handleResetRound = () => {
        giveAnswer(null);
        reset();
    };

    const isFormDisabled = answerExists;

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
                    const isCorrect = isAnsweredOption && index === correctOptionIndex;
                    const isIncorrect = isAnsweredOption && index !== correctOptionIndex;
                    const isNotAnswered = answerExists && !isAnsweredOption;

                    return (
                        <Option
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            {...register('option')}
                            option={option}
                            value={index}
                            isCorrect={isCorrect}
                            isIncorrect={isIncorrect}
                            isNotAnswered={isNotAnswered}
                            disabled={isFormDisabled}
                        />
                    );
                })}
            </form>
        </RoundWrapper>
    );
};

export default SimpleQuiz;
