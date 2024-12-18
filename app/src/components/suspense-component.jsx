import listenersResource from '@src/resources/listener-resource';
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';
import { useActiveCountry, useLocationData } from '@src/contexts/map-data-context';

function SuspenseComponent({className='', ...props}) {

    // React Suspense will handle switching between skeleton and loaded grid
    const EnhancedContent = withFallbackAndBoundary({
        Component:Content
    });

    useLifecycleLogger('SuspenseComponent');
    return <EnhancedContent {...{className, ...props}}/>
}

function Content({ className, ...props }) {
    const {servers, ...rest} = listenersResource.read(); // React Suspense handles loading
    const { activeCountry } = useActiveCountry();
    console.log(activeCountry)
    return (
        <div className={`flex flex-row w-full justify-around ${className}`} {...props}>
            <h1 className='font-bold text-6xl'>
                {activeCountry?.name}
            </h1>
        </div>
    )
}

export default SuspenseComponent;