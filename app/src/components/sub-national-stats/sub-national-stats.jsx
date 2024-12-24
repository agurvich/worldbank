
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import LinkedDotPlotGrid from './linked-dot-plot-grid';
import { useActiveCountryData } from '@src/contexts/map-data-context';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';

function SubNationalStats({moon, className='', ...props}) {


    useLifecycleLogger('SubNationalStats');
    return (
        <div key='SubNationalStats' className={`${className}`} {...props}>
            <div>
                <h2 className="text-lg font-bold">Poverty Stats</h2>
                <SPIDStats 
                    getData={ readResource => ({
                        povertyRate215:readResource['p215'],
                        povertyRate365:readResource['p365'],
                        povertyRate580:readResource['p580'],
                    })}
                />
            </div>
            <div>
                <h2 className="text-lg font-bold">Prosperity Stats</h2>
                <SPIDStats
                    getData={ readResource => ({
                        prosperityGap:readResource['pgap'],
                    })}
                />
            </div>
            <div>
                <h2 className="text-lg font-bold">Inequality Stats</h2>
                <SPIDStats
                    getData={ readResource => ({
                        mean:readResource['mean'],
                        gini:readResource['gini'],
                        thiel:readResource['thiel'],
                    })}
                />
            </div>
        </div>
    );
}

export default SubNationalStats;

function SPIDStats({ className = '', ...props }) {
    const EnhancedContent = withFallbackAndBoundary({
        Component: SPIDStatsContent,
    });

    useLifecycleLogger('SPIDStats');
    return <EnhancedContent {...{ className, ...props }} />;
}

function SPIDStatsContent({getData}){
    const { spidInequalityDataResource } = useActiveCountryData();
    if (!spidInequalityDataResource) return null
    return (
        <LinkedDotPlotGrid data={getData(spidInequalityDataResource?.read())}/>
    );
}