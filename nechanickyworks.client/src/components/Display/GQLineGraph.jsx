import * as React from 'react';
import { LinePlot, LineChart, ResponsiveChartContainer, ChartsYAxis, ChartsXAxis, ChartsLegend, MarkPlot, ChartsTooltip, LineHighlightPlot } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const GQLineGraph = ({ dataRefs, dataVals, xLabel }) => {
    const yValueFormatter = (value) => {
        return `10E${value}`;
    };
    return (
        <React.Fragment>
            {(dataVals.length > 0 && dataRefs.length > 0) ? (
                <LineChart
                    series={dataVals.map((series) => ({
                        ...series,
                        valueFormatter: (v) => (yValueFormatter(v)),
                    }))}
                    xAxis={[{ id: "xAxisId", scaleType: 'linear', data: dataRefs, label: xLabel, tickMinStep: 1 }]}
                    yAxis={[{ scaleType: 'linear', id: 'leftAxisId', label: "Absolute Error", valueFormatter: yValueFormatter, max:1, min: -20}]}
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