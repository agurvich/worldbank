import { drawYTicks } from './d3-common';
import { drawYTicks } from "./d3-init";


export function addYAxisLines(svg, yScale, width, color = "gray") {
    // Select all existing y-grid elements, bind data (yScale ticks), and create new groups for each tick
    const yGrid = svg.selectAll(".y-grid")
        .data(yScale.ticks(10), (d, idx) => idx); // use 10 evenly spaced ticks using yScale's ticks method

    const yGridEnter = yGrid.enter()
        .append("g")
        .attr("class", "y-grid");

    drawYTicks(yGridEnter, yScale, width, activeVariable, color);
}

export function drawYTicks(yGridEnter, yScale, width, activeVariable, color = "orange") {
    const units = activeVariable === 0 ? "° F" : " cm";

    yGridEnter.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yScale)
        .attr("y2", yScale)
        .attr("stroke", color); // Set the color for the gridlines

    yGridEnter.append("text")
        .attr("x", -10) // Position text slightly left of the y-axis
        .attr("y", yScale)
        .attr("dy", "0.35em") // Vertically center the text relative to the line
        .attr("fill", color) // Text color
        .text(d => `${d}${units}`) // append unit to the tick value
        .attr("text-anchor", "end") // right align
        .attr("class", "font-md");

}
