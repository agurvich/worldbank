import { useState, useEffect } from 'react';

function useCanvasWidth() {
    const [canvasWidth, setCanvasWidth] = useState(calculateWidth);

    useEffect(() => {
        // Define the function to update width
        const updateWidth = () => setCanvasWidth(calculateWidth());

        // Initialize ResizeObserver to watch for changes
        const observer = new ResizeObserver(updateWidth);
        observer.observe(document.documentElement);

        // Also listen for window resize events
        window.addEventListener('resize', updateWidth);

        // Clean up on unmount
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return canvasWidth;
}

function calculateWidth() {
    const safeAreaInsetLeft = parseFloat(
        getComputedStyle(document.documentElement)
            .getPropertyValue('--safe-area-inset-left')
    ) || 0;

    const safeAreaInsetRight = parseFloat(
        getComputedStyle(document.documentElement)
            .getPropertyValue('--safe-area-inset-right')
    ) || 0;

    const width = document.getElementById('content-area')?.getBoundingClientRect().width
    return width;
}

export default useCanvasWidth;
