import classNames from 'classnames';
import React, {
    ChangeEvent,
    forwardRef,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
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
 * Accepts a ref to allow targeting of the first radio input.
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
    const [dimensions, setLabelHeight] = useState<[number, number] | null>(
        null
    );

    const labelRef = useRef<HTMLLabelElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const observerRef = React.useRef(
        new ResizeObserver((entries) => {
            // Only care about the first element, we expect one element ot be watched
            const { height } = entries[0].contentRect;

            console.log('in  resize');
            console.dir(entries[0].contentRect);

            console.dir(entries[0].target.getBoundingClientRect().x);

            setLabelHeight([
                height,
                entries[0].target.getBoundingClientRect().x,
            ]);
        })
    );

    React.useEffect(() => {
        const observer = observerRef.current;
        const labelElement = labelRef.current;

        if (labelElement) {
            observer.observe(labelElement);
        }

        return () => {
            if (labelElement) {
                observer.unobserve(labelElement);
            }
        };
    }, [labelRef, observerRef]);

    const labelLeft = dimensions ? dimensions[1] : null;

    const left = useMemo(() => {
        if (containerRef.current) {
            console.dir(containerRef.current.getBoundingClientRect());
            console.log('labelLeft: ' + labelLeft);
        }
        return labelLeft && containerRef.current
            ? labelLeft - containerRef.current.getBoundingClientRect().left
            : null;
    }, [labelLeft]);

    const containerClasses = classNames('toggle-container', { disabled });

    const overlayClasses = classNames('overlay-mask', {
        'option-2-selected': selected === option2.value,
    });

    return (
        <div className={containerClasses} ref={containerRef}>
            <span
                style={{
                    height: dimensions ? dimensions[0] + 'px' : '',
                    left: left ? `${left}px` : '',
                }}
                className={overlayClasses}
            ></span>
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
                    labelRef={labelRef}
                ></Radio>

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
