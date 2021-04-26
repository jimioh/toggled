import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggle from '../toggle/Toggle';
import Question from './Question';

describe('Question Tests', () => {
    test('Questions renders question text', () => {
        const question = 'This is a question';

        render(
            <Question question={question} correctAnswer={{}} defaultAnswer={{}}>
                {(isCorrect, setAnswer, firstToggleRef) => <div></div>}
            </Question>
        );

        const questionElement = screen.getByText(question);
        expect(questionElement).toBeInTheDocument();
    });

    test('Questions renders and first toggle has focus', () => {
        const question = 'This is a question';

        render(
            <Question
                question={question}
                correctAnswer={{
                    active: 'on',
                    colour: 'blue',
                }}
                defaultAnswer={{
                    active: 'off',
                    colour: 'blue',
                }}
            >
                {(isCorrect, setAnswer, firstToggleRef) => (
                    <Toggle
                        name="active"
                        key="active"
                        option1={{ value: 'off', label: 'Off' }}
                        option2={{ value: 'on', label: 'On' }}
                        initialValue="off"
                        onChange={setAnswer}
                        disabled={isCorrect}
                        ref={firstToggleRef}
                    />
                )}
            </Question>
        );

        const firstInputElement = screen.getByLabelText('Off');
        expect(firstInputElement).toHaveFocus();

        const statusMessage = screen.getByText('The answer is incorrect.');
        expect(statusMessage).toBeInTheDocument();
    });

    test('Questions renders with correct answer and shows correct message', () => {
        const question = 'This is a question';

        const correctAnswer = {
            active: 'on',
            colour: 'blue',
        };

        render(
            <Question
                question={question}
                correctAnswer={correctAnswer}
                defaultAnswer={correctAnswer}
            >
                {(isCorrect, setAnswer, firstToggleRef) => (
                    <Toggle
                        name="active"
                        key="active"
                        option1={{ value: 'off', label: 'Off' }}
                        option2={{ value: 'on', label: 'On' }}
                        initialValue="off"
                        onChange={setAnswer}
                        disabled={isCorrect}
                        ref={firstToggleRef}
                    />
                )}
            </Question>
        );

        const statusMessage = screen.getByText('The answer is correct.');
        expect(statusMessage).toBeInTheDocument();
    });

    test('Questions renders with correct answer and toggle change is not triggered on toggle click', () => {
        const question = 'This is a question';

        const correctAnswer = {
            active: 'on',
            colour: 'blue',
        };

        const onToggleChange = jest.fn();

        render(
            <Question
                question={question}
                correctAnswer={correctAnswer}
                defaultAnswer={correctAnswer}
            >
                {(isCorrect, setAnswer, firstToggleRef) => (
                    <Toggle
                        name="active"
                        key="active"
                        option1={{ value: 'off', label: 'Off' }}
                        option2={{ value: 'on', label: 'On' }}
                        initialValue="off"
                        onChange={onToggleChange}
                        disabled={isCorrect}
                        ref={firstToggleRef}
                    />
                )}
            </Question>
        );

        const statusMessage = screen.getByText('The answer is correct.');
        expect(statusMessage).toBeInTheDocument();

        userEvent.click(screen.getByText('Off'));

        expect(onToggleChange).not.toHaveBeenCalled();
    });
});
