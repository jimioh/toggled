import classNames from 'classnames';
import React, { ChangeEvent, forwardRef, useState } from 'react';
import Radio from '../radio/Radio';
import './toggle.css';

export interface Option {
    value: string;
    label: string;
    selected?: boolean;
}

interface ToggleProps {
    name: string;
    initialValue?: string;
    disabled?: boolean;
    option1: Option;
    option2: Option;
    onChange: (name: string, value: string) => void;
}

/**
 * Toggle component which renders a pair of radiobuttons as a toggle slider.
 * Accepts a ref to allow targeting of the first radio input.S
 */
const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
    {
        name,
        option1,
        option2,
        onChange,
        initialValue,
        disabled = false,
    }: ToggleProps,
    ref
) {
    const [selected, setSelected] = useState(initialValue || option1.value);

    const containerClasses = classNames('toggle-container', { disabled });

    const overlayClasses = classNames('overlay-mask', {
        'option-2-selected': selected === option2.value,
    });

    return (
        <div className={containerClasses}>
            <div
                className="radios-container"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (disabled) {
                        return;
                    }

                    setSelected(event.target.value);
                    onChange(name, event.target.value);
                }}
            >
                <Radio
                    name={name}
                    value={option1.value}
                    label={option1.label}
                    checked={selected === option1.value}
                    ref={ref}
                >
                    <span className={overlayClasses}></span>
                </Radio>

                <Radio
                    name={name}
                    value={option2.value}
                    label={option2.label}
                    checked={selected === option2.value}
                />
            </div>
        </div>
    );
});

export default Toggle;
