import { QuestionState } from './question.types';
import { questionReducer } from './questionReducer';

describe('questionReducer Tests', () => {
    test('does not change isCorrect  and percentageCorrect when set incorrect single property answer', () => {
        const initialState: QuestionState = {
            isCorrect: false,
            correctAnswer: { active: 'on' },
            currentAnswer: { active: 'off' },
            percentageCorrect: 0,
        };

        const state = questionReducer(initialState, {
            type: 'set-answer',
            name: 'active',
            value: 'test',
        });

        expect(state).toEqual({
            isCorrect: false,
            correctAnswer: { active: 'on' },
            currentAnswer: { active: 'test' },
            percentageCorrect: 0,
        });
    });

    test('sets isCorrect to true and percentageCorrect to 100 when set correct single property answer', () => {
        const initialState: QuestionState = {
            isCorrect: false,
            correctAnswer: { active: 'on' },
            currentAnswer: { active: 'off' },
            percentageCorrect: 0,
        };

        const state = questionReducer(initialState, {
            type: 'set-answer',
            name: 'active',
            value: 'on',
        });

        expect(state).toEqual({
            isCorrect: true,
            correctAnswer: { active: 'on' },
            currentAnswer: { active: 'on' },
            percentageCorrect: 100,
        });
    });
});
