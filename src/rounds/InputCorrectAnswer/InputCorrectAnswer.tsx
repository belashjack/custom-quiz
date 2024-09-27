import { FC } from 'react';
import RoundWrapper from '../RoundWrapper/RoundWrapper';
import { InputCorrectAnswerRound } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import './InputCorrectAnswer.scss';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import useAnswer from '../hooks/useAnswer';

interface InputCorrectAnswerFormFields {
    answer: string;
}

const InputCorrectAnswer: FC<InputCorrectAnswerRound> = (props) => {
    const {
        content: { description, correctAnswer },
    } = props;

    const winDetector = (answer: string) => {
        return correctAnswer
            .map((correctAnswer) => correctAnswer.toLocaleLowerCase())
            .includes(answer.toLocaleLowerCase());
    };

    const { answer, answerExists, setAnswer, isWin, isLose, isLoseByTimer } = useAnswer<string>(winDetector);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputCorrectAnswerFormFields>({
        defaultValues: {
            answer: answerExists(answer) ? answer : '',
        },
    });

    const resetInternalState = () => {
        reset();
    };

    const onSubmit: SubmitHandler<InputCorrectAnswerFormFields> = ({ answer }) => {
        setAnswer(answer);
    };

    const isRoundDisabled = answerExists(answer) || isLoseByTimer;

    return (
        <RoundWrapper
            description={description}
            isWin={isWin}
            isLose={isLose}
            isLoseByTimer={isLoseByTimer}
            resetRound={resetInternalState}
            forceLose={() => {
                setAnswer(null, true);
                resetInternalState();
            }}
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
                    disabled={isRoundDisabled}
                    hasError={Boolean(errors.answer)}
                    isCorrect={isWin}
                    isIncorrect={isLose}
                />
                {!isRoundDisabled && <Button isSubmitButton>Ответить</Button>}
            </form>
        </RoundWrapper>
    );
};

export default InputCorrectAnswer;
