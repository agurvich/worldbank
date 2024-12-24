import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';
import { useActiveCountry, useLocationData } from '@src/contexts/map-data-context';
import { useChartData } from '@src/contexts/chart-data-context';
import Chart from './chart';

function InfoPane({className='', ...props}) {

    // React Suspense will handle switching between skeleton and loaded grid
    const EnhancedContent = withFallbackAndBoundary({
        Component:Content
    });

    useLifecycleLogger('InfoPane');
    return <EnhancedContent {...{className, ...props}}/>
}


function Content({ className, ...props }) {

    return (
        <div className={`p-4 flex flex-col w-full gap-8 ${className}`} {...props}>
            <div className='w-96 h-96'>
                <Chart /> 
            </div>
        </div>
    )
}

export default InfoPane;