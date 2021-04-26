import { useEffect, useRef } from 'react';

/**
 * useFocus will focus the input element the ref is attached to on first render.
 * @returns {RefObject<HTMLInputElement} Ref to attach to element to focus.
 */
export function useFocus() {
    const focusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
        }
    }, []);

    return focusRef;
}
