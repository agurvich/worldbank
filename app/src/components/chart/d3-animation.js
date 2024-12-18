import * as d3 from 'd3';
import { determineColor, drawLine, determineLinewidth } from './d3-lines';

export function animateTheta(
    group,         // The D3 selection group to which the data lines are added
    activeLines, otherLines,
    data,          // Data to be visualized, all 4 ssps
    xScale, yScale, // Scales for positioning the data points
    minYear, maxYear,     // positions of year slider handles 
    thetaRef, isSeasonView, // Angles for rotation between states
    sspIDX, activeScenario // this scenario index and the currently active scenario index
){
    const targetTheta = isSeasonView ? 0 : Math.PI/2;
    const removedLines = []; // Store removed lines for re-adding later
    const thresh = 0.99;

    if (targetTheta !== thetaRef.current) {
        // Interpolator for smooth transitions of the theta value
        const interpolateTheta = d3.interpolateNumber(thetaRef.current, targetTheta);

        return group.transition()
            .duration(3000)
            .tween("rotate", function () {
                return function (t) {
                    const theta = interpolateTheta(t);
                    thetaRef.current = theta;
                    const thetaFrac = theta/(Math.PI/2);

                    const scaleFactor = ( t < thresh && t > (1-thresh) ) ? 2 : 1;

                    if ( ( t > (1 - thresh) ) && removedLines.length === 0 ){
                        const linesToRemove = activeLines.filter(d => d.year % 2 === 1);
                        linesToRemove.each(function(d) {
                            // Store the removed lines (DOM node + data)
                            removedLines.push({ node: this, data: d });
                        });

                        // Remove the selected lines
                        linesToRemove.remove();
                    }

                    // Update the data lines with the new theta value
                    activeLines.attr("d", d => drawLine(d, theta, xScale, yScale, minYear, maxYear))
                        .attr("stroke-width", d => scaleFactor*linewidth(d, theta, maxYear))
                        .attr("stroke", d => determineColor(d,data,thetaRef,isSeasonView,sspIDX,activeScenario))
                    otherLines.forEach( thisSelection =>
                        thisSelection.attr("opacity", thetaFrac*thetaFrac * inactiveOpacity)
                    );

                    // Re-add the removed lines near the end of the animation (e.g., at 90% progress)
                    if (t > thresh && removedLines.length > 0) {
                        // Re-add removed lines
                        removedLines.forEach(({ node, data:d }) => {
                            // Append the node back to the group
                            group.append(() => node)
                                .attr("d", drawLine(d, theta, xScale, yScale, minYear, maxYear))
                                .attr("stroke-width", linewidth(d, theta, maxYear))
                                .attr("stroke", determineColor(d, data, thetaRef, isSeasonView, sspIDX, activeScenario));
                        });

                        // Clear the removed lines array to avoid re-adding
                        removedLines.length = 0; 
                    }

                };
            });
    }
    else return group;
}