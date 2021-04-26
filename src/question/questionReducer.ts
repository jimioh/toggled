import { checkAnswer } from './checkAnswer';
import { QuestionAction, QuestionState } from './question.types';

export function questionReducer(
    state: QuestionState,
    action: QuestionAction
): QuestionState {
    switch (action.type) {
        case 'set-answer':
            const currentAnswer = {
                ...state.currentAnswer,
                [action.name]: action.value,
            };

            const { isCorrect, percentageCorrect } = checkAnswer(
                state.correctAnswer,
                currentAnswer
            );

            return {
                ...state,
                currentAnswer,
                isCorrect,
                percentageCorrect,
            };

        /*
            Potentially other actions such as reset to default, or show correct answer...
        */
        default:
            return { ...state };
    }
}
