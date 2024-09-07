import { FC, useContext, useEffect, useState } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { InputCorrectAnswerRound } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppContext } from '../../AppContext';
import './InputCorrectAnswer.scss';
import Explanation from '../components/Explanation/Explanation';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

interface InputCorrectAnswerFormFields {
    answer: string;
}

const InputCorrectAnswer: FC<InputCorrectAnswerRound> = (props) => {
    const {
        content: { description, correctAnswers, correctExplanation, incorrectExplanation },
    } = props;
    const { killLife, isEasyMode } = useContext(AppContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputCorrectAnswerFormFields>();
    const [answer, setAnswer] = useState<string | null>(null);

    const answerExists = answer !== null;
    const isLose =
        answerExists &&
        !correctAnswers.map((correctAnswer) => correctAnswer.toLocaleLowerCase()).includes(answer.toLocaleLowerCase());

    useEffect(() => {
        if (!isEasyMode && isLose) {
            killLife();
        }
    }, [answer]);

    const handleResetRound = () => {
        setAnswer(null);
        reset();
    };

    const onSubmit: SubmitHandler<InputCorrectAnswerFormFields> = (data) => {
        const { answer } = data;

        setAnswer(answer);
    };

    const isFormDisabled = answerExists;
    const isWin =
        answerExists &&
        correctAnswers.map((correctAnswer) => correctAnswer.toLocaleLowerCase()).includes(answer.toLocaleLowerCase());

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
