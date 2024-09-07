import { FC } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { InputCorrectAnswerRound } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import './InputCorrectAnswer.scss';
import Explanation from '../components/Explanation/Explanation';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import useAnswer from '../hooks/useAnswer';

interface InputCorrectAnswerFormFields {
    answer: string;
}

const InputCorrectAnswer: FC<InputCorrectAnswerRound> = (props) => {
    const {
        content: { description, correctAnswers, correctExplanation, incorrectExplanation },
    } = props;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputCorrectAnswerFormFields>();

    const winDetector = (answer: string) => {
        return correctAnswers
            .map((correctAnswer) => correctAnswer.toLocaleLowerCase())
            .includes(answer.toLocaleLowerCase());
    };

    const { answerExists, giveAnswer, isWin, isLose } = useAnswer<string>(winDetector);

    const handleResetRound = () => {
        giveAnswer(null);
        reset();
    };

    const onSubmit: SubmitHandler<InputCorrectAnswerFormFields> = ({ answer }) => {
        giveAnswer(answer);
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
                className="input-correct-answer-form"
                onSubmit={(e) => {
                    void handleSubmit(onSubmit)(e);
                }}
            >
                <Input
                    {...register('answer', { required: true })}
                    placeholder="Введи ответ"
                    disabled={isFormDisabled}
                    hasError={Boolean(errors.answer)}
                    isCorrect={isWin}
                    isIncorrect={isLose}
                />
                {!isFormDisabled && (
                    <Button isSubmitButton disabled={isFormDisabled}>
                        Ответить
                    </Button>
                )}
                {isWin && <Explanation isCorrect {...correctExplanation} />}
                {isLose && <Explanation isIncorrect {...incorrectExplanation} />}
            </form>
        </RoundWrapper>
    );
};

export default InputCorrectAnswer;
