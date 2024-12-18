import * as d3 from 'd3';
export function addXAxis(svg, xScale, height) {
    // Generate tick labels
    const labels = getXtickLabels();

    // Create a D3 axis generator
    const xAxisGenerator = d3.axisBottom(xScale)
        .tickValues(labels.map(d => d.value)) // Use the custom tick values
        .tickFormat((d, i) => labels[i].label); // Format ticks using the labels

    // Select or append the x-axis group
    let xAxis = svg.select(".x-axis");
    if (xAxis.empty()) {
        xAxis = svg.append("g").attr("class", "x-axis");
    }

    // Update x-axis position and call the generator
    xAxis
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisGenerator);
}

function getXtickLabels(){
    var months;

    // Define month abbreviations
    const monthNames = [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];

    months = monthNames.map((monthName, idx) => ({
        label: monthName,
        value: monthName
    }));

    return months;
}

function drawNewXTicks(ticksEnter, xScale, height, labels, tickHeight = 8){
    // Append the line elements to the entering groups
    ticksEnter.append("line")
        .attr("y1", height)
        .attr("y2", height + tickHeight)
        .attr("x1", d => xScale(d.value))
        .attr("x2", d => xScale(d.value))
        .attr("stroke-width", 1)
        .attr("stroke", "var(--stroke-contrast-strong)");

    // Append the text elements to the entering groups
    ticksEnter.append("text")
        .attr("font-size", "12px")
        .attr("class", "font-md")
        .attr("dy", tickHeight + 12)  // Place the text below the tick line
        .attr("text-anchor", (d, idx) => getTextAnchor(idx, labels))

}

function getTextAnchor(idx,months){
    if (idx === 0) return 'start';
    if (idx === months.length - 1) return 'end';
    return 'middle';
}