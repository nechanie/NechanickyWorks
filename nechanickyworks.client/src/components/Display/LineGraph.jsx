import * as React from 'react';
import { LinePlot, ResponsiveChartContainer, ChartsYAxis, ChartsXAxis, ChartsLegend, ChartsGrid, ChartsTooltip, MarkPlot, LineHighlightPlot } from '@mui/x-charts';


const LineGraph = ({ dataRefs, dataVals, xLabel, showPoints = false}) => {

    return (
        <React.Fragment>
            {(dataVals.length > 0 && dataRefs.length > 0) ? (<ResponsiveChartContainer
                series={dataVals}
                xAxis={[{ id: "xAxisId", scaleType: 'linear', data: dataRefs }]}
                yAxis={[{ scaleType: 'linear', id: 'leftAxisId', min: 0, max: 1 }, { scaleType: 'linear', id: 'rightAxisId' }]}>
                <LinePlot />
                <ChartsXAxis label={xLabel} position="bottom" axisId="xAxisId" />
                <ChartsYAxis label="Accuracy" position="left" axisId="leftAxisId" />
                <ChartsYAxis label="Loss" position="right" axisId="rightAxisId" />
                <ChartsGrid horizontal={true} />
                <ChartsLegend direction="row" position={{ vertical: "top", horizontal: "middle" }} />
                {showPoints && (<MarkPlot />) }
                {showPoints && (<ChartsTooltip />)}
                {showPoints && (<LineHighlightPlot />)}
            </ResponsiveChartContainer>) : (
                null
            )}
        </React.Fragment>
    );
}

export default LineGraph;