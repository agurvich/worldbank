import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import useDimensions from "@src/hooks/dimensions";
import { withFallbackAndBoundary } from "@src/utils/suspense-error-hoc";
import { createChartResource } from "@src/resources/resource";
import { drawChart } from "./chart-utils";
import { useChartData } from "@src/contexts/chart-data-context";
import useLifecycleLogger from "@src/hooks/lifecycle-logger";

function Chart({ className = "", ...props }) {
    const EnhancedChart = withFallbackAndBoundary({
        Component: ChartContent,
    });

    useLifecycleLogger("Chart");
    return <EnhancedChart {...{ className, ...props }} />;
}

function ChartContent() {
    const { chartData } = useChartData();
    const wrapperRef = useRef();
    const svgRef = useRef();
    const dimensions = useDimensions(wrapperRef);
    // Resource to track the drawing process
    const [chartResource, setChartResource] = useState(null);

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
        if (chartData?.lines.length) {
            // Create the resource when chartData changes
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

    chartResource?.read()

    useLifecycleLogger("ChartContent", 0);
    return (
        <div ref={wrapperRef} className="h-full w-full border-contrast border">
            {chartResource && <svg ref={svgRef} {...{ width: dimensions.width, height: dimensions.height }} />}
        </div>
    );
}

export default Chart;
