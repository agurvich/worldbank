import { useEffect } from 'react';

function useLifecycleLogger(componentName, debugLevel=-1) {
    // Log when the render starts
    if (debugLevel > 0){
        console.log(`<${componentName} /> starts rendering`);
    }
    else if (debugLevel === 0) console.log(`<${componentName} />`);

    useEffect(() => {
        // Log when the component mounts
        console.log(`<${componentName} /> mounted`);

        return () => {
            // Log when the component unmounts
            console.log(`<${componentName} /> unmounted`);
        };
    }, []); // Empty dependency array means this runs only on mount and unmount

    useEffect(() => {
        // Log when the render finishes (on every render)
        if (debugLevel > 0){
            console.log(`<${componentName} /> finished rendering`);
        }
    });
}

export default useLifecycleLogger;