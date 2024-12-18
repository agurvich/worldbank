import * as d3 from 'd3';

export function addYAxis(svg, yScale, margin) {

    const labels = getYTickLabels();

    // Create a D3 axis generator
    const yAxisGenerator = d3.axisLeft(yScale)
        .tickValues(labels.map(d => d.value)) // Use custom tick values
        .tickFormat((d, i) => labels[i].label); // Format ticks using custom labels

    // Select or append the y-axis group
    let yAxis = svg.select(".y-axis");
    if (yAxis.empty()) {
        yAxis = svg.append("g").attr("class", "y-axis");
    }

    // Update y-axis position and call the generator
    yAxis
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxisGenerator);
}

// Generate Y-axis labels (example function)
export function getYTickLabels() {
    const percentages = [0, 25, 50, 75, 100];
    return percentages.map(pct => ({
        label: `${pct}%`,
        value: pct  // Convert percentage to scale range (0 to 1)
    }));
}