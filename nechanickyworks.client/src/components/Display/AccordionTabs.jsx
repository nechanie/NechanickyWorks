import React, { useState } from 'react';
import { Box, Card, CardActionArea, Collapse, CardContent, Typography, useMediaQuery, Grid, Paper } from '@mui/material';
import useCurrentBreakpoint from '../utils/BreakpointTracker';
import { useEffect } from 'react';

function indexByBreakpoint(breakpoint) {
    let index = null;
    switch (breakpoint){
        case 'xs':
            index = 2;
            break;
        case 'sm':
            index = 2;
            break;
        case 'md':
            index = 3;
            break;
        case 'lg':
            index = 4;
            break;
        case 'xl':
            index = 4;
            break;
    }
    return index;
}

function createRows(data, onIndex) {
    let returnList = [];
    let tabList = [];
    let contentList = [];
    data.forEach((dataItem, indexNum) => {
        tabList.push(dataItem.label);
        contentList.push(dataItem.content);
        if ((indexNum + 1) % onIndex === 0) {
            returnList.push([tabList, contentList]);
            tabList = [];
            contentList = [];
        }
    })
    if (tabList.length > 0) {
        returnList.push([tabList, contentList]);
    }
    return returnList;
}


const AccordionTabs = ({ tabs, adaptiveSizes = 'auto' }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const currentBreakpoint = useCurrentBreakpoint();
    const [collapseIndex, setCollapseIndex] = useState(indexByBreakpoint(currentBreakpoint));
    var [rows, setRows] = useState(createRows(tabs, collapseIndex));
    const [content, setContent] = useState(null);
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [hasExited, setHasExited] = useState(true);
    const [firstRender, setFirstRender] = useState(true);

    const handleChange = (row, index) => {
        if (!firstRender) {
            setHasExited(false);
        }
        else {
            setFirstRender(false);
        }
        if (selectedRow === row && selectedIndex == index) {
            setSelectedIndex(null);
            setSelectedRow(null);
        }
        else {
            if (selectedIndex === null && selectedRow === null) {
                setContent(rows[row][1][index]);
                setHasExited(true);
            }
            setSelectedRow(row);
            setSelectedIndex(index);
        }
    };

    const handleOnExited = () => {
        if (selectedIndex === null && selectedRow === null) {
            setContent(null);
        }
        else {
            setContent(rows[selectedRow][1][selectedIndex]);
        }
        setHasExited(true);
    }

    useEffect(() => {
        setCollapseIndex((prev) => {
            const newIndex = indexByBreakpoint(currentBreakpoint);
            return newIndex;
        });
    }, [currentBreakpoint]);

    useEffect(() => {
        setRows(createRows(tabs, collapseIndex));
    }, [collapseIndex, tabs]);



    return (
            <Grid container spacing={3}>
                {rows.map((row, rowIndex) => (
                    <Grid item xs={12} key={`row-${rowIndex}`}>
                        <Grid container spacing={3} justifyContent='center'>
                            {row[0].map((tab, tabIndex) => (
                                <Grid item xs={6} sm={6} md={4} lg={3} key={`row-${rowIndex}-col-${tabIndex}`}>
                                    <Card variant='outlined' sx={{maxHeight: adaptiveSizes, maxWidth:adaptiveSizes} }>
                                        <CardActionArea onClick={() => handleChange(rowIndex ,tabIndex)}>
                                            {tab}
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                            <Grid item xs={12} sx={{paddingTop:'0 !important'}}>
                                <Collapse in={parseInt(selectedRow) === rowIndex && hasExited} timeout={1000} onExited={() => handleOnExited()} mountOnEnter unmountOnExit >
                                    <Paper p={2} sx={{ width: '100%', my: "4%" }} color='secondary'>
                                        {content}
                                    </Paper>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
    );
}

export default AccordionTabs;
