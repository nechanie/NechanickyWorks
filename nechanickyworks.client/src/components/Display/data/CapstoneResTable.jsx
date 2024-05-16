import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from "@mui/material"

const CapstoneResTable = ({ setupTime, modelTime, upsertTime, queryTime, systemTime, kMin, kMax, kAvg, rows }) => {
    const [paddingRows, setPaddingRows] = React.useState([]);

    React.useEffect(() => {
        console.log(rows);
        setPaddingRows((prevState) => {
            let tablePaddingRows = [];
            for (let i = 0; i < rows.count - 3 && i < 10; i++) {
                tablePaddingRows.push(i);
            }
            return tablePaddingRows;
        });
    }, [rows])

    return (
        <TableContainer>
            <Table aria-label="spanning table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="right"></TableCell>
                        <TableCell align="center" colSpan={4}>
                            Sub-Task
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'></TableCell>
                        <TableCell align='center'>Initial Setup</TableCell>
                        <TableCell align='center'>Embedding Profiles</TableCell>
                        <TableCell align='center'>Uploading Embeddings</TableCell>
                        <TableCell align='center'>Similar Profile Search</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='center'>Time Taken (s)</TableCell>
                        <TableCell align='center'>{setupTime ? (setupTime.toFixed(2)) : (<Skeleton variant='rectangular' />)}</TableCell>
                        <TableCell align='center'>{modelTime ? (modelTime.toFixed(2)) : (<Skeleton variant='rectangular' />)}</TableCell>
                        <TableCell align='center'>{upsertTime ? (upsertTime.toFixed(2)) : (<Skeleton variant='rectangular' />)}</TableCell>
                        <TableCell align='center'>{queryTime ? (queryTime.toFixed(2)) : (<Skeleton variant='rectangular' />)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3}>
                            Similar Profiles
                        </TableCell>
                        <TableCell colSpan={2}>
                            Results
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={rows.count ? rows.count : 4} colSpan={3}>
                            <TableContainer sx={{ maxHeight: 440}}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Profile</TableCell>
                                            <TableCell align='center'>Description</TableCell>
                                            <TableCell align='center'>K Score</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { rows.count !== 0 ? (rows.map((row) => (
                                            <TableRow hover key={row.person_id}>
                                                <TableCell>{row.person_id}</TableCell>
                                                <TableCell align="right">{row.description}</TableCell>
                                                <TableCell align="right">{ row.kScore.toFixed(2) }</TableCell>
                                            </TableRow>
                                        ))) : (
                                            <TableRow><TableCell rowSpan={1} colSpan={3}><Skeleton variant='rectangular' animation="wave" /></TableCell></TableRow>)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TableCell>
                        <TableCell align='center'>Time Taken (s)</TableCell>
                        <TableCell align='center'>{systemTime ? (systemTime.toFixed(2)) : (<Skeleton variant='rectangular' />)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>Smallest K Score</TableCell>
                        <TableCell align='center'>{kMin ? (kMin.toFixed(2)) : (<Skeleton variant='rectangular' />)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>Largest K Score</TableCell>
                        <TableCell align='center'>{kMax ? (kMax.toFixed(2)) : (<Skeleton variant='rectangular' />)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>Average K Score</TableCell>
                        <TableCell align='center'>{kAvg ? (kAvg.toFixed(2)) : (<Skeleton variant='rectangular' />)}</TableCell>
                    </TableRow>
                    {rows.count > 3 ? (
                        paddingRows.map((value) => (
                            <TableRow key={value}><TableCell colSpan={2}></TableCell></TableRow>
                        ))
                    ) : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CapstoneResTable;