import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import useDimensions from "@src/hooks/dimensions";
import { withFallbackAndBoundary } from "@src/utils/suspense-error-hoc";
import { createChartResource } from "@src/resources/resource";
import useLifecycleLogger from "@src/hooks/lifecycle-logger";

function Chart({ chartData, dataReady, drawChart, className = "", ...props }) {
    const EnhancedChart = withFallbackAndBoundary({
        Component: () => ChartContent({ chartData, dataReady, drawChart }),
    });

    useLifecycleLogger("Chart");
    return <EnhancedChart {...{ className, ...props }} />;
}

function ChartContent({chartData, dataReady, drawChart}) {
    const wrapperRef = useRef();
    const svgRef = useRef();
    const dimensions = useDimensions(wrapperRef);
    const [chartResource, setChartResource] = useState(null);

    // Clear previous chart on dimension changes
    useEffect(() => {
        if (svgRef.current) {
            console.log("removing all chart content");
            const svg = d3.select(svgRef.current);
            svg.selectAll("*").remove();
        }
    }, [dimensions]);

    // Update the chart resource when data changes
    useEffect(() => {
        if (dataReady(chartData)) {
            setChartResource(
                createChartResource((done) => {
                    drawChart({
                        svgRef,
                        dimensions,
                        ...chartData,
                    });
                    done(); // Notify when drawing is complete
                })
            );
        }
    }, [chartData, dimensions]);

    // Ensure resource is read and suspense works
    if (chartResource) chartResource.read();

    useLifecycleLogger("ChartContent", 0);
    return (
        <div ref={wrapperRef} className="h-full w-full border-contrast border">
            <svg ref={svgRef} {...{ width: dimensions.width, height: dimensions.height }} />
        </div>
    );
}

export default Chart;
