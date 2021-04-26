import classnames from 'classnames';
import React, { useCallback, useReducer } from 'react';
import { checkAnswer } from './checkAnswer';
import { QuestionProps } from './question.types';
import { questionReducer } from './questionReducer';
import './question.css';
import { useFocus } from '../lib/useFocus';

const DARK_HUE_DEGREES = 8;
const LIGHT_HUE_DEGREES = 19;

/**
 * Generates the style object for the background by applying a percentage value to
 * a pre-determined colour hue range and adding that to the base hue.
 * @param {number} percentageCorrect Percentage as number for how many correct answers are present.
 */
export function getGradientHues(percentageCorrect: number) {
    const increase = Math.abs((40 * percentageCorrect) / 100);
    const newDarkHue = DARK_HUE_DEGREES + increase;
    const newLightHue = LIGHT_HUE_DEGREES + increase;

    return {
        background: `linear-gradient(
            to bottom,
            hsl(${newLightHue}deg 94% 68% / 70%),
            hsl(${newDarkHue}deg 93% 54% / 69%)
        )`,
    };
}

/**
 * Question component that will render a multi part question, and manage the state interactions of
 * a user partially changing the answer. The Question component provides feedback on the correctness of the
 * answer.
 *
 * Question has been decoupled from the answer type, e.g. Toggle, and provides the state, and a function to update
 * the answer (setAnswer) so that the developer is free to render whatever controls they want to allow the user to
 * answer the question.
 *
 * For accessibility, the status message has the aria-live="polite" attribute to notify any screen-readers or other
 * devices that the answer is correct/incorrect.
 */
function Question({
    question,
    correctAnswer,
    defaultAnswer,
    children,
}: QuestionProps) {
    const [state, dispatch] = useReducer(
        questionReducer,
        {
            correctAnswer,
            currentAnswer: {},
            isCorrect: false,
            percentageCorrect: 0,
        },
        (s) => {
            return {
                ...s,
                ...checkAnswer(correctAnswer, defaultAnswer),
                currentAnswer: defaultAnswer,
            };
        }
    );

    // Set the first input to have focus on first render
    const firstFocusRef = useFocus();

    // Callback to pass into render props for setting the answer.
    const setAnswer = useCallback(
        (name: string, value: string) =>
            dispatch({ type: 'set-answer', name, value }),
        [dispatch]
    );

    const { isCorrect, percentageCorrect } = state;

    const classes = classnames('question-container', {
        correct: isCorrect,
    });

    // Generate background style. I would use CSS-in-JS here if I had more time.
    let backgroundStyle = isCorrect ? {} : getGradientHues(percentageCorrect);

    return (
        <div className={classes} style={backgroundStyle}>
            <fieldset>
                <legend>{question}</legend>

                <div className="answers">
                    {children(isCorrect, setAnswer, firstFocusRef)}
                </div>
            </fieldset>

            <div className="status-message" aria-live="polite">
                <span>
                    The answer is {isCorrect ? 'correct' : 'incorrect'}.
                </span>
            </div>
        </div>
    );
}

export default Question;
