import React from 'react';
import { render, screen } from '@testing-library/react';
import Radio from './Radio';
import userEvent from '@testing-library/user-event';

describe('Radio Tests', () => {
    test('Radio renders label text', () => {
        const value = 'on';
        const label = 'On';

        render(<Radio name="active" label={label} value={value} />);

        const radioElement = screen.getByText(label);
        expect(radioElement).toBeInTheDocument();
    });

    test('Radio triggers onChange function when clicked', () => {
        const value = 'on';
        const label = 'On';

        const onChange = jest.fn();

        render(
            <Radio
                name="active"
                label={label}
                value={value}
                onChange={onChange}
            />
        );

        const radioElement = screen.getByText(label);

        userEvent.click(radioElement);

        expect(onChange).toHaveBeenCalled();
    });
});
