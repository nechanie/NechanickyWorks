import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, useTheme, Box } from "@mui/material"

const CapstoneResTable = ({ setupTime, modelTime, upsertTime, queryTime, systemTime, kMin, kMax, kAvg, rows }) => {
    const [paddingRows, setPaddingRows] = React.useState([]);
    const theme = useTheme();
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
                        <TableCell align="right" sx={{ borderBottom: 'None' }}></TableCell>
                        <TableCell align="center" colSpan={4} sx={{ color: theme.palette.text.primary, backgroundColor: theme.palette.primary.main, borderTopLeftRadius:10, borderTopRightRadius:10 }}>
                                <strong>Sub-Task</strong>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: theme.palette.background.main }}>
                        <TableCell align='center' sx={{ borderBottom: 'None' }}></TableCell>
                        <TableCell align='center' sx={{ borderLeft: '1px solid rgb(224 224 224)', borderBottom: '1px solid rgb(224 224 224)' }}><strong style={{ color: theme.palette.text.primary }}>Initial Setup</strong></TableCell>
                        <TableCell align='center' sx={{ borderBottom: '1px solid rgb(224 224 224)' } }><strong style={{ color: theme.palette.text.primary }}>Embedding Profiles</strong></TableCell>
                        <TableCell align='center' sx={{ borderBottom: '1px solid rgb(224 224 224)' }}><strong style={{ color: theme.palette.text.primary }}>Uploading Embeddings</strong></TableCell>
                        <TableCell align='center' sx={{ borderRight: '1px solid rgb(224 224 224)', borderBottom: '1px solid rgb(224 224 224)' }}><strong style={{ color: theme.palette.text.primary }}>Similar Profile Search</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='center' sx={{ border: '1px solid rgb(224 224 224)' } }><strong style={{ color: theme.palette.text.primary }}>Time Taken (s)</strong></TableCell>
                        <TableCell align='center' sx={{ borderLeft: '1px solid rgb(224 224 224)' }}>{setupTime ? setupTime.toFixed(2) : <Skeleton variant='rectangular' />}</TableCell>
                        <TableCell align='center'>{modelTime ? modelTime.toFixed(2) : <Skeleton variant='rectangular' />}</TableCell>
                        <TableCell align='center'>{upsertTime ? upsertTime.toFixed(2) : <Skeleton variant='rectangular' />}</TableCell>
                        <TableCell align='center' sx={{ borderRight: '1px solid rgb(224 224 224)' }}>{queryTime ? queryTime.toFixed(2) : <Skeleton variant='rectangular' />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center' colSpan={5} sx={{borderBottom: 'None', borderTop: 'None'}}></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3} align='center' sx={{ borderRadius: 10, backgroundColor: theme.palette.primary.light, borderBottom: 'None', borderTop: 'None' }}>
                            <strong style={{ color: theme.palette.text.primary }}>Similar Profiles</strong>
                        </TableCell>
                        <TableCell colSpan={2} align='center' sx={{ borderRadius: 10, backgroundColor: theme.palette.primary.light, borderBottom: 'None', borderTop: 'None' }}>
                            <strong style={{ color: theme.palette.text.primary }}>Results</strong>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={rows.count ? rows.count : 4} colSpan={3}>
                            <TableContainer sx={{ maxHeight: 440, boxShadow: 1, borderRadius: 1, background: theme.palette.background.paper }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.background.main }}>
                                            <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>Profile</strong></TableCell>
                                            <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>Description</strong></TableCell>
                                            <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>K Score</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.count !== 0 ? (rows.map((row) => (
                                            <TableRow hover key={row.person_id}>
                                                <TableCell>{row.person_id}</TableCell>
                                                <TableCell align="right">{row.description}</TableCell>
                                                <TableCell align="right">{row.kScore.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))) : (
                                            <TableRow><TableCell rowSpan={1} colSpan={3}><Skeleton variant='rectangular' animation="wave" /></TableCell></TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TableCell>
                        <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>Time Taken (s)</strong></TableCell>
                        <TableCell align='center'>{systemTime ? systemTime.toFixed(2) : <Skeleton variant='rectangular' />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>Smallest K Score</strong></TableCell>
                        <TableCell align='center'>{kMin ? kMin.toFixed(2) : <Skeleton variant='rectangular' />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>Largest K Score</strong></TableCell>
                        <TableCell align='center'>{kMax ? kMax.toFixed(2) : <Skeleton variant='rectangular' />}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>Average K Score</strong></TableCell>
                        <TableCell align='center'>{kAvg ? kAvg.toFixed(2) : <Skeleton variant='rectangular' />}</TableCell>
                    </TableRow>
                    {rows.count > 3 && paddingRows.map((value) => (
                        <TableRow key={value}><TableCell colSpan={2}></TableCell></TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CapstoneResTable;