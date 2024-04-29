import * as React from 'react';
import { LinePlot, LineChart, ResponsiveChartContainer, ChartsYAxis, ChartsXAxis, ChartsLegend, MarkPlot, ChartsTooltip, LineHighlightPlot } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const GQLineGraph = ({ dataRefs, dataVals, xLabel }) => {
    const yValueFormatter = (value) => {
        const exponent = Math.log10(value);
        return `10E${Math.round(exponent)}`;
    };
    const xValueFormatter = (value) => {
        return `${value.toFixed(0)}`;
    };
    return (
        <React.Fragment>
            {(dataVals.length > 0 && dataRefs.length > 0) ? (
                <LineChart
                    series={dataVals}
                    xAxis={[{ id: "xAxisId", scaleType: 'linear', data: dataRefs, label: xLabel, tickMinStep: 1 }]}
                    yAxis={[{ scaleType: 'log', id: 'leftAxisId', label: "Absolute Error", valueFormatter: yValueFormatter}]}
                    slotProps={{ direction: "row", position: { vertical: "top", horizontal: "middle" } }}
                    margin={{left:90} }
                    sx={{
                        [`.${axisClasses.left} .${axisClasses.label}`]: {
                            // Move the y-axis label with CSS
                            transform: 'translateX(-20px)',
                        },
                    }}
                    />
            ) : null}
        </React.Fragment>
    );
}

export default GQLineGraph;