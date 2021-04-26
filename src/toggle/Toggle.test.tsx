import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';

import Toggle, { Option } from './Toggle';

describe('Toggle Answer Tests', () => {
    test('Toggle renders answer options text rendered', () => {
        const option1: Option = {
            value: 'on',
            label: 'On',
        };

        const option2: Option = {
            value: 'off',
            label: 'Off',
        };

        render(
            <Toggle
                name="active"
                option1={option1}
                option2={option2}
                onChange={jest.fn()}
            />
        );

        const option1Element = screen.getByText(option1.label);
        expect(option1Element).toBeInTheDocument();

        const option2Element = screen.getByText(option2.label);
        expect(option2Element).toBeInTheDocument();
    });

    test('First option selected by default and second is returned on change', () => {
        const name = 'active';

        const option1: Option = {
            value: 'on',
            label: 'On',
        };

        const option2: Option = {
            value: 'off',
            label: 'Off',
        };

        const onChange = jest.fn();

        render(
            <Toggle
                name={name}
                option1={option1}
                option2={option2}
                onChange={onChange}
            />
        );

        userEvent.click(screen.getByText(option2.label));
        expect(onChange).toHaveBeenCalledWith(name, option2.value);
    });

    test('Second option selected and first is returned on change', () => {
        const name = 'active';

        const option1: Option = {
            value: 'on',
            label: 'On',
        };

        const option2: Option = {
            value: 'off',
            label: 'Off',
        };

        const onChange = jest.fn();

        render(
            <Toggle
                name={name}
                option1={option1}
                option2={option2}
                onChange={onChange}
                initialValue={option2.value}
            />
        );

        userEvent.click(screen.getByText(option1.label));
        expect(onChange).toHaveBeenCalledWith(name, option1.value);
    });

    test('First option selected by default and second is returned on change triggered by tab', () => {
        const name = 'active';

        const option1: Option = {
            value: 'on',
            label: 'On',
        };

        const option2: Option = {
            value: 'off',
            label: 'Off',
        };

        const onChange = jest.fn();

        render(
            <Toggle
                name={name}
                option1={option1}
                option2={option2}
                onChange={onChange}
            />
        );

        const firstRadio = screen.getByLabelText(option1.label);
        const secondRadio = screen.getByLabelText(option2.label);

        firstRadio.focus();

        expect(firstRadio).toHaveFocus();

        userEvent.type(firstRadio, specialChars.arrowRight);

        // fireEvent.keyDown(firstRadio, {
        //     key: 'ArrowRight',
        //     code: 39,
        // });

        expect(secondRadio).toHaveFocus();
        expect(onChange).toHaveBeenCalledWith(name, option2.value);
    });
});
