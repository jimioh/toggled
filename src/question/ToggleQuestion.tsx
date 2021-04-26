import React from 'react';
import Toggle from '../toggle/Toggle';
import Question from './Question';
import { Answer, ToggleConfig } from './question.types';

interface ToggleQuestionProps {
    question: string;
    toggles: ToggleConfig[];
    correctAnswer: Answer;
    defaultAnswer: Answer;
}

/**
 * ToggleQuestion is a wrapper component for a Question component which renders Toggle inputs as children.
 * It is driven by the toggles array of config objects for each toggle, and the correct and default answers.
 * @returns
 */
function ToggleQuestion({
    question,
    toggles,
    correctAnswer,
    defaultAnswer,
}: ToggleQuestionProps) {
    return (
        <Question
            question={question}
            correctAnswer={correctAnswer}
            defaultAnswer={defaultAnswer}
        >
            {(isCorrect, setAnswer, firstFocusRef) => {
                return toggles.map(({ name, options }, index) => {
                    const value = defaultAnswer[name];

                    return (
                        <Toggle
                            name={name}
                            key={name}
                            option1={options[0]}
                            option2={options[1]}
                            initialValue={value}
                            onChange={setAnswer}
                            disabled={isCorrect}
                            // Pass ref to first toggle only to set focus.
                            ref={index === 0 ? firstFocusRef : null}
                        />
                    );
                });
            }}
        </Question>
    );
}

export default ToggleQuestion;
