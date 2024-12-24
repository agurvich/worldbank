import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';
import { useState } from 'react';
import NationalStats from './national-stats/national-stats';
import SubNationalStats from './sub-national-stats/sub-national-stats';
import { useActiveCountry } from '@src/contexts/map-data-context';

function InfoPane({ className = '', ...props }) {
    const EnhancedContent = withFallbackAndBoundary({
        Component: Content,
    });

    useLifecycleLogger('InfoPane');
    return <EnhancedContent {...{ className, ...props }} />;
}

function Content({ className = '', ...props }) {
    const [currentTab, setCurrentTab] = useState(0); // Tracks the active tab
    const [visibleTab, setVisibleTab] = useState(0); // Tracks the active tab
    const [isAnimating, setIsAnimating] = useState(false); // Locks animation transitions
    const animationDuration = 1250; // Animation duration in ms

    const { activeCountry } = useActiveCountry();

    const handleTabChange = (tabIndex) => {
        if (tabIndex !== currentTab && !isAnimating) {
            setIsAnimating(true); // Lock transitions
            setCurrentTab(tabIndex); // trigger the rotation
            setTimeout(() => setVisibleTab(tabIndex), animationDuration/3) // trigger the content change
        }
    };

    const handleTransitionEnd = () => {
        setIsAnimating(false); // Unlock transitions after animation completes
    };

    return (
        <div className={`p-4 flex flex-col w-full gap-8 ${className}`} {...props}>
            <div className="flex flex-col h-full w-full">
                {/* Tabs */}
                <div className="flex flex-row items-center justify-center space-x-4 border-b p-2">
                    <h1 className='text-2xl font-bold'> {activeCountry?.name} </h1>
                    <button
                        className={`px-4 py-2 rounded ${
                            currentTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                        onClick={() => handleTabChange(0)}
                        disabled={isAnimating} // Disable button during animation
                    >
                        Rankings
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            currentTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                        onClick={() => handleTabChange(1)}
                        disabled={isAnimating} // Disable button during animation
                    >
                        Details
                    </button>
                </div>

                {/* Content Area: Spinning Billboard */}
<div
    className={`relative w-full h-96 transition-all`}
    style={{
        transform: currentTab === 0 ? 'rotateY(0deg)' : 'rotateY(180deg)',
        transformStyle: 'preserve-3d', // Ensures children participate in the 3D space
        transitionDuration:`${animationDuration}ms`,

    }}
    onTransitionEnd={handleTransitionEnd} // Ensure `isAnimating` resets after the transition
>
    <div>
        {/* Front Face (Rankings) */}
        <div
            className="absolute w-full h-full shadow-lg border border-black"
            style={{ 
                transform: 'rotateY(0deg)',
                opacity: visibleTab === 0 ? 1 : 0,
            }}
        >
            <NationalStats />
        </div>

        {/* Back Face (Details) */}
        <div
            className="absolute w-full h-full shadow-lg border border-black"
            style={{
                transform: 'rotateY(180deg)',
                opacity: visibleTab === 0 ? 0 : 1,
            }}
        >
            <SubNationalStats />
        </div>
    </div>
</div>

            </div>
        </div>
    );
}

export default InfoPane;
