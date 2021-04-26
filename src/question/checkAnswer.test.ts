import { checkAnswer } from './checkAnswer';

describe('checkAnswer tests', () => {
    test('single property incorrect answer returns false and 0%', () => {
        const correctAnswer = {
            test: 'true',
        };

        const { isCorrect, percentageCorrect } = checkAnswer(correctAnswer, {
            test: 'false',
        });

        expect(isCorrect).toEqual(false);
        expect(percentageCorrect).toEqual(0);
    });

    test('single property correct answer returns true and 100%', () => {
        const correctAnswer = {
            test: 'true',
        };

        const { isCorrect, percentageCorrect } = checkAnswer(
            correctAnswer,
            correctAnswer
        );

        expect(isCorrect).toEqual(true);
        expect(percentageCorrect).toEqual(100);
    });

    test('double property correct answer returns true and 100%', () => {
        const correctAnswer = {
            test: 'true',
            colour: 'blue',
        };

        const { isCorrect, percentageCorrect } = checkAnswer(
            correctAnswer,
            correctAnswer
        );

        expect(isCorrect).toEqual(true);
        expect(percentageCorrect).toEqual(100);
    });

    test('double property with one correct answer returns false and 50%', () => {
        const correctAnswer = {
            test: 'true',
            colour: 'blue',
        };

        const partiallyWrongAnswer = {
            test: 'true',
            colour: 'red',
        };

        const { isCorrect, percentageCorrect } = checkAnswer(
            correctAnswer,
            partiallyWrongAnswer
        );

        expect(isCorrect).toEqual(false);
        expect(percentageCorrect).toEqual(50);
    });

    test('double property with no correct answers returns false and 0%', () => {
        const correctAnswer = {
            test: 'true',
            colour: 'blue',
        };

        const completeWrongAnswer = {
            test: 'false',
            colour: 'red',
        };

        const { isCorrect, percentageCorrect } = checkAnswer(
            correctAnswer,
            completeWrongAnswer
        );

        expect(isCorrect).toEqual(false);
        expect(percentageCorrect).toEqual(0);
    });
});
