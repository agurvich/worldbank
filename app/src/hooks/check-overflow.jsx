import { useState, useEffect } from 'react';

function useOverflow(ref) {
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (ref.current && ref.current.parentElement) {
                const childWidth = ref.current.getBoundingClientRect().width;
                const parentWidth = ref.current.parentElement.getBoundingClientRect().width;
                setIsOverflowing(childWidth > parentWidth);
            }
        };

        // Initial check
        checkOverflow();

        // Create a ResizeObserver to watch for changes in size
        const observer = new ResizeObserver(checkOverflow);

        // Start observing the ref element and its parent
        if (ref.current) {
            observer.observe(ref.current);
            if (ref.current.parentElement) {
                observer.observe(ref.current.parentElement);
            }
        }

        // Cleanup observer on unmount
        return () => observer.disconnect();
    }, [ref]);

    return isOverflowing;
}

export default useOverflow;
