import { render, screen } from '@testing-library/react';
import { ToggleConfig } from './question.types';
import ToggleQuestion from './ToggleQuestion';

describe('ToggleQuestion Tests', () => {
    test('Questions renders question text and all answer labels', () => {
        const question = 'This is a question';

        const toggles: ToggleConfig[] = [
            {
                name: 'active',
                options: [
                    {
                        value: 'on',
                        label: 'On',
                    },
                    {
                        value: 'off',
                        label: 'Off',
                    },
                ],
            },
            {
                name: 'colour',
                options: [
                    {
                        value: 'blue',
                        label: 'Blue Hello Moon',
                    },
                    {
                        value: 'red',
                        label: 'Red',
                    },
                ],
            },
            {
                name: 'direction',
                options: [
                    {
                        value: 'up',
                        label: 'Up',
                    },
                    {
                        value: 'down',
                        label: 'Down',
                    },
                ],
            },
        ];

        render(
            <ToggleQuestion
                question={question}
                toggles={toggles}
                correctAnswer={{
                    active: 'off',
                    colour: 'blue',
                    direction: 'up',
                }}
                defaultAnswer={{
                    active: 'on',
                    colour: 'blue',
                    direction: 'down',
                }}
            ></ToggleQuestion>
        );

        const questionElement = screen.getByText(question);
        expect(questionElement).toBeInTheDocument();

        toggles.forEach((toggle) => {
            toggle.options.forEach((option) => {
                const optionElement = screen.getByText(option.label);
                expect(optionElement).toBeInTheDocument();
            });
        });
    });
});
