import { Answer } from './question.types';

/**
 * Compares a multipart answer (represented by object properties)to the correct answer to determine
 * correctness, and a percentage of the answer parts that are correct.
 * @param {Answer} correct Correct answer for question as object.
 * @param {Answer} current Current answer for question as object.
 * @returns {[boolean, number]} Returns a tuple containing a boolean to indicate if the current answer is correct and a
 * percentage value to indicate how many answer parts were correct overall.
 */
export function checkAnswer(correct: Answer, current: Answer) {
    const keys = Object.keys(correct);

    const correctAnswers = keys.reduce<string[]>((correctAnswers, key) => {
        const correctAnswer = correct[key];
        const currentAnswer = current[key];

        if (correctAnswer === currentAnswer) {
            correctAnswers.push(key);
        }

        return correctAnswers;
    }, []);

    return {
        isCorrect: correctAnswers.length === keys.length,
        percentageCorrect: (correctAnswers.length / keys.length) * 100,
    };
}
