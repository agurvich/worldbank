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


    const detailsClassName="w-full group border border-gray-300 rounded-lg p-4 bg-white shadow-md";
    const summaryClassName="h-full w-full font-semibold text-gray-700 cursor-pointer list-none flex justify-between items-center";

    return (
        <div className={`p-4 flex flex-col w-full ${className}`} {...props}>
            <div className='flex flex-row w-full justify-around'>
                <h1 className='font-bold text-6xl mb-4'>
                    {activeCountry?.name} 
                </h1>
            </div>
            <div className='flex flex-col flex-1'>
                <details className={detailsClassName}>
                    <summary className={summaryClassName}>Poverty</summary>
                    <ul>
                        <li>
                            poverty headcount ratio at $2.15
                        </li>
                        <li>
                            poverty headcount ratio at $3.65
                        </li>
                        <li>
                            poverty headcount ratio at $6.85
                        </li>
                    </ul>
                </details>
                <details className={detailsClassName}>
                    <summary className={summaryClassName}>Inequality</summary>
                    <p>Inequality encompasses disparities in wealth, opportunities, and access to services across different groups in society. Addressing inequality promotes fairness and inclusivity.</p>
                </details>
                <details className={detailsClassName}>
                    <summary className={summaryClassName}>Prosperity</summary>
                    <p>Prosperity represents economic growth, improved living standards, and sustainable well-being for all. It emphasizes shared benefits and equitable access to opportunities.</p>
                </details>

                <details className={detailsClassName}>
                    <summary className={summaryClassName}>Development</summary>
                    <p>Development is the process of improving the quality of life and economic opportunities in a sustainable way. It includes investments in infrastructure, education, and health systems.</p>
                </details>
            </div>
        </div>
    )
}

export default SuspenseComponent;