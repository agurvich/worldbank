import listenersResource from '@src/resources/listener-resource';
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';

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
    return (
        <div className={`flex flex-wrap gap-4 ${className}`} {...props}>
            hello world
        </div>
    )
}

export default SuspenseComponent;