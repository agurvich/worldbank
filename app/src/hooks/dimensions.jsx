import { useEffect, useState } from "react";


function useDimensions(wrapperRef){
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observeTarget = wrapperRef.current;
        const resizeObserver = new ResizeObserver( ([entry]) => {
            setDimensions({
                width: entry.contentRect.width,
                height: entry.contentRect.height // Maintain a square aspect ratio or modify as needed
            });
        });

        resizeObserver.observe(observeTarget);

        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, []);

    return dimensions;
}

export default useDimensions;