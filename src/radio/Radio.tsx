import classNames from 'classnames';
import React, {
    ChangeEventHandler,
    forwardRef,
    PropsWithChildren,
} from 'react';

/**
 * Generates a hopefully unique id for a radio input.
 * @param {string} fieldName Name of input field.
 * @param {string} fieldValue Value for input field.
 * @returns {string} An id representing the field.
 */
function getFieldId(fieldName: string, fieldValue: string) {
    return `${fieldName}-${fieldValue}`;
}

// Using non-standard HTML attributes here to narrow types.
interface RadioProps {
    label: string;
    name: string;
    value: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Radio input which displays a label and can render children, and can optionally take a forwarded ref
 * for parent components to manipulate the input element.
 *  */
const Radio = forwardRef<HTMLInputElement, PropsWithChildren<RadioProps>>(
    function Radio(
        {
            label,
            name,
            value,
            checked = false,
            onChange,
            children,
        }: PropsWithChildren<RadioProps>,
        ref
    ) {
        const id = getFieldId(name, value);
        const radioClasses = classNames('radio clearfix', { checked });

        return (
            <label className={radioClasses}>
                <input
                    type="radio"
                    value={value}
                    name={name}
                    id={id}
                    defaultChecked={checked}
                    ref={ref}
                    onChange={onChange}
                />
                <span className="label">{label}</span>

                {children}
            </label>
        );
    }
);

export default Radio;
