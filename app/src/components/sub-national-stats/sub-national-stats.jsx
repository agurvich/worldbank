
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import LinkedDotPlotGrid from './linked-dot-plot-grid';
import { useActiveCountryData } from '@src/contexts/map-data-context';
import { withFallbackAndBoundary } from '@src/utils/suspense-error-hoc';
import createResource from '@src/resources/resource';
import { useEffect, useState } from 'react';

function SubNationalStats({moon, className='', ...props}) {


    useLifecycleLogger('SubNationalStats');
    return (
        <div key='SubNationalStats' className={`${className}`} {...props}>
            <div>
                <h2 className="text-lg font-bold">Poverty Stats</h2>
                <SPIDStats getData={getPovertyStats} />
            </div>
            <div>
                <h2 className="text-lg font-bold">Prosperity Stats</h2>
                {/*
                <SPIDStats
                    getData={ readResource => ({
                        prosperityGap:readResource['prospgap2017'],
                    })}
                />
                */}
            </div>
            <div>
                <h2 className="text-lg font-bold">Inequality Stats</h2>
                {/*
                <SPIDStats
                    getData={ readResource => ({
                        mean:readResource['mean2017'],
                        gini:readResource['gini'],
                        theil:readResource['theil'],
                    })}
                />
                */}
            </div>
        </div>
    );
}

export default SubNationalStats;

const getPovertyStats = async (queryThisFile, setData) => {
    const query = `
        SELECT 
            poor215, poor365, poor685
        FROM $fileName
    `;
    const rows = await queryThisFile(query)
    console.log('rows are!',rows)
    return setData({
        povertyRate215: rows[0]?.poor215,
        povertyRate365: rows[0]?.poor365,
        povertyRate580: rows[0]?.poor685,
    });
};

function SPIDStats({ className = '', ...props }) {
    const EnhancedContent = withFallbackAndBoundary({
        Component: SPIDStatsContent,
        className,
        ...props
    });

    useLifecycleLogger('SPIDStats');
    return < EnhancedContent  />
}

function SPIDStatsContent({getData, className, ...props}){
    // load the duckdb interface, which upon read() will register
    //  the parquet file and return a function that will query the file. 
    //  getData uses that function, runs a specific query, and then binds
    //  the results to a javascript object.
    const [ data, setData ] = useState(null);
    const { spidInequalityDataResource } = useActiveCountryData();
    useEffect(()=>{
        if (spidInequalityDataResource){
            getData(spidInequalityDataResource?.read(), setData)
        }
    },[spidInequalityDataResource]);

    if (!spidInequalityDataResource || !data) return null
    return (
        <LinkedDotPlotGrid data={data}/>
    );
}