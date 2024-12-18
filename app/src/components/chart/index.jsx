import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import { drawChart } from './chart-utils';

import useDimensions from '@src/hooks/dimensions';
import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { useChartData } from '@src/contexts/chart-data-context';

function Chart() {
    // Access the current location (latitude and longitude)
    
    // Destructure relevant data and settings from the data context
    const { chartData,
        minX,maxX,
        minY,maxY,
     } = useChartData();


    const wrapperRef = useRef();
    const svgRef = useRef();
    // unpack the min and max years
    
    // Get the dimensions of the wrapper div, used to size the SVG
    const dimensions = useDimensions(wrapperRef);

    useEffect(
        ()=>{ 
            if (svgRef.current){
                console.log("removing all chart content")
                const svg = d3.select(svgRef.current);
                svg.selectAll("*").remove();
            }
        },
    [ dimensions ]);

    // actually draw the chart 
    useEffect(() => {
        if (chartData?.length ) {
            drawChart({
                svgRef,               // Reference to the SVG element
                chartData,                 // Data to be visualized, all 4 ssps
                minX,maxX,
                minY,maxY,
                // Current dimensions of the wrapper div, for responsiveness
                dimensions,          
            });
        }
    }, [ chartData, dimensions, ]);

    useLifecycleLogger("Chart", 0);
    return (
        <div ref={wrapperRef} className='h-full w-full border-contrast border'>
            {/* The SVG where the D3 chart will be drawn */}
            <svg
                ref={svgRef}
                {...{ width: dimensions.width, height: dimensions.height }}
            />
        </div>
    );
}

export default Chart;
