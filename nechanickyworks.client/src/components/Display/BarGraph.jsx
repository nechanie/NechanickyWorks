import * as React from 'react';
import {useTheme} from '@mui/material';
import { BarChart, ResponsiveChartContainer, ChartsYAxis, ChartsXAxis, ChartsGrid, ChartsTooltip, ChartsAxisHighlight } from '@mui/x-charts';
import { cheerfulFiestaPalette } from '@mui/x-charts/colorPalettes';


const BarGraph = ({ dataRefs, dataVals }) => {

    const theme = useTheme();
    const lineColor = cheerfulFiestaPalette(theme.palette.mode);
    return (
        <React.Fragment>
            {(dataVals.length > 0 && dataRefs.length > 0) ? (
                //    <ResponsiveChartContainer
                //    series={dataVals}
                //    xAxis={[{ id: "xAxisId", scaleType: 'band', tickPlacement: 'middle', tickLabelPlacement: 'middle', data: dataRefs }]}
                //    yAxis={[{ scaleType: 'linear', id: 'leftAxisId', min: 0, max: 100 }]}
                //>
                //    <BarPlot />
                //    <ChartsXAxis position="bottom" axisId="xAxisId"/>
                //    <ChartsYAxis label="Incorrect (%)" position="left" axisId="leftAxisId" />
                //    <ChartsGrid horizontal={true} />
                //    <ChartsTooltip />
                //    <ChartsAxisHighlight/>
                //    </ResponsiveChartContainer>
                <BarChart series={dataVals} grid={{ horizontal: true }} xAxis={[{ scaleType: 'band', tickPlacement: 'middle', tickLabelPlacement: 'middle', data: dataRefs, colorMap: {type: 'ordinal', colors: lineColor} }]} yAxis={[{ scaleType: 'linear', id: 'leftAxisId', min: 0, max: 100, label:"Incorrect (%)" }]}/>
            ) : (
                null
            )}
        </React.Fragment>
    );
}

export default BarGraph;