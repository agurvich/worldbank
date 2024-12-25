import useLifecycleLogger from '@src/hooks/lifecycle-logger';
import { SelectMenu } from '@src/components/select-menu';
import { useState } from 'react';

function LinkedDotPlotGrid({queryThisFn, className='', ...props}) {

    console.log(queryThisFn)
    debugger
    const datasets = Object.keys({hi:15});
    const [ dataset, setDataset ]  = useState(datasets[0]);


    useLifecycleLogger('LinkedDotPlotGrid');
    return (
        <div key='LinkedDotPlotGrid' className={`flex flex-col items-center ${className}`} {...props}>
            <SelectMenu {...{
                value : dataset, 
                values : datasets,
                setValue : setDataset
            }} />
            <div className='w-full bg-green-500/10'>
                <LinkedDotPlot data={dataset} />

            </div>
        </div>
    );
}

export default LinkedDotPlotGrid;

function LinkedDotPlot({data, className='', ...props}) {

    useLifecycleLogger('LineChart');
    return (
        <Chart {...{
            chartData: data, 
            dataReady: () => false,
            drawChart: drawDotPlot
        }} />
    );
}

/* ---------- D3 renderer below  ------------- */ 
import * as d3 from 'd3';
import { renderToString } from 'react-dom/server';
import { BsThermometerHalf, BsDropletHalf } from "react-icons/bs";
import { addYAxis } from '@src/components/chart/d3-yticks';
import { addXAxis } from '@src/components/chart/d3-xticks';
import { addDataLines } from '@src/components/chart/d3-lines';
import { animateTheta } from '@src/components/chart/d3-animation';
import Chart from '../chart';

export function drawDotPlot({
    svgRef,               // Reference to the SVG element
    dimensions,
    lines,                 // chartData to be visualized, all 4 ssps
    minX,maxX,
    minY,maxY,
    // Current dimensions of the wrapper div, for responsiveness
    ...pars
}) {
    // Select the SVG element and clear any existing content
    const svg = d3.select(svgRef.current);
    //svg.selectAll("*").remove();

    // Set up margins and calculate the width and height of the drawing area
    const margin = { top: 15, right: 15, bottom: 25, left: 45 };
    // hardcode dimensions and use viewBox to scale
    const canvasWidth = dimensions.width - margin.left - margin.right;
    const canvasHeight = dimensions.height - margin.top - margin.bottom;

    // Set up the x and y scales for the chart
    //  map fractional position to pixels
    const xScale = d3.scaleLinear().domain([minX, maxX]).range([0, canvasWidth]);
    const yScale = d3.scaleLinear().domain([minY, maxY]).range([canvasHeight, 0]);

    // Create a group element to contain the chart elements, positioned by the margins
    let mainGroup = svg.select("g.main-group");

    const backgroundIconSize = 1000;
    if (mainGroup.empty()) {
        mainGroup = svg.append("g")
            .attr("class", "main-group")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        /*
        mainGroup.append("g")
            .attr("opacity", 0.15)
            .attr("transform",
                `translate(${(canvasWidth - backgroundIconSize) / 2}, ${(canvasHeight - backgroundIconSize) / 2})`)
            .attr('class','background-icon');
            */
    }

    // Add Y-axis lines to the chart
    addYAxis(mainGroup, yScale, canvasWidth, minY, maxY);
    // Add X-axis ticks to the chart
    addXAxis(mainGroup, xScale, canvasHeight, minX, maxX);

    console.log(lines)
    const otherLines = [];
    // Add chartData lines to the chart for each chartData set except the active scenario
    lines.forEach((thisLineData) => {
        otherLines.push(addDataLines(
            mainGroup,
            thisLineData,
            xScale, yScale
        ));
    });

    // attach any animations
    /* disable animation  :( */
    /*
    animateTheta(
        mainGroup,
        activeLines, otherLines,
        chartData[activeScenario].sspchartData,
        xScale, yScale,
    );
    */

    // Render an icon as a background element in the chart
    const Icon = BsThermometerHalf;
    const iconSVGString = renderToString(<Icon {...{ size:backgroundIconSize }} />);
    //d3.select('.background-icon').html(iconSVGString);
}