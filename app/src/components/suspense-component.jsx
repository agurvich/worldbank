import listenersResource from '@src/resources/listener-resource';
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';
import { useActiveCountry, useLocationData } from '@src/contexts/map-data-context';
import Chart from './chart';
import countryDataResource from '@src/resources/country-data-resource';
import { useChartData } from '@src/contexts/chart-data-context';
import { useEffect } from 'react';

function SuspenseComponent({className='', ...props}) {

    // React Suspense will handle switching between skeleton and loaded grid
    const EnhancedContent = withFallbackAndBoundary({
        Component:Content
    });

    useLifecycleLogger('SuspenseComponent');
    return <EnhancedContent {...{className, ...props}}/>
}


function Content({ className, ...props }) {
    //const {servers, ...rest} = listenersResource.read(); // React Suspense handles loading
    const [ multiDimPoverty, foodSecurity ] = countryDataResource.read(); 
    const { activeCountry } = useActiveCountry();

    const {setChartData} = useChartData();

    console.log()
    console.log()


    const multiDimPovertyData = multiDimPoverty[activeCountry.name];
    const foodSecurityData = foodSecurity.fs_data[activeCountry.name];
    useEffect(()=>{
        if (foodSecurityData){

            const values = foodSecurityData.map((y, idx) => ({
                x: foodSecurity.fs_years[idx],
                y: y,
                id: idx
            }));

            const chartData = {
                values: values,
                lineParams: {},
                name: "default0"
            };
            setChartData([chartData]);
        }
    },[activeCountry]);


    const detailsClassName="w-full p-4 group border border-gray-300 rounded-lg bg-white shadow-md";
    const summaryClassName="h-full w-full font-semibold text-gray-700 cursor-pointer list-none flex justify-between items-center";

    return (
        <div className={`p-4 flex flex-col w-full ${className}`} {...props}>
            <div className='flex flex-row w-full justify-around'>
                <h1 className='font-bold text-6xl mb-4'>
                    {activeCountry?.name} 
                </h1>
            </div>
            {multiDimPovertyData && Object.entries(multiDimPovertyData).map(
                ([key, value],idx) => {
                    return(

                    <div key={`${idx}-number`} className='flex flex-row'>
                        <h2 className='font-semi-bold text-xl'>{key}</h2>: {value}%
                    </div>
                    );
                }
            )}
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
                </details>
                <details className={detailsClassName}>
                    <summary className={summaryClassName}>Prosperity</summary>
                </details>
                <details className={detailsClassName}>
                </details>
            </div>
            <div className='h-96 w-96'> <Chart /> </div>
        </div>
    )
}

export default SuspenseComponent;