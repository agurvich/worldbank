import * as d3 from 'd3';

export function addDataLines(
    group,         // The D3 selection group to which the data lines are added
    data,          // Data to be visualized, all 4 ssps
    xScale, yScale // Scales for positioning the data points
) {
    const groupClass = `.line-${data.name}`;

    // Select existing lines or append new ones if needed
    var lines = group.selectAll(groupClass).data( data.values, d => d.id);
    lines.exit().remove();  // Remove old lines

    lines.enter()
        .append("path")
        .attr("fill", "none")
        .attr("class",`line-${data.name}`)
        .merge(lines)  // Merge new and existing lines
        .attr("stroke", determineColor(data))
        .attr("d", drawLine( data.values, xScale, yScale))  // Set the path for each line
        .attr("stroke-width", determineLinewidth(data))
        .attr("opacity", determineOpacity(data))

    return lines;
}

// Function to draw the line segment for each data point
export function drawLine(values, xScale, yScale) {

    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

    // apply filter from the year slider handle range
    return line(values);
}

// Function to calculate the line width based on theta and year difference
export function determineLinewidth(data) {
    const baseWidth = 3;
    return data?.lineParams?.linewidth || baseWidth;
}

export function determineColor(data){
    return data?.lineParams?.color || "#000000FF";
}

export function determineOpacity(data){
    return data?.lineParams?.opacity || 1;
}

