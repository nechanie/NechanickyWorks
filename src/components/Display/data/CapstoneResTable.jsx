import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, useTheme, Grid, Paper, Typography, TablePagination } from "@mui/material"

const CapstoneResTable = ({ setupTime, modelTime, upsertTime, queryTime, systemTime, kMin, kMax, kAvg, rows, selectedProfile }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [showTable, setShowTable] = React.useState(false);
    const theme = useTheme();
    React.useEffect(() => {
        setShowTable((rows.length) > 0 ? true : false);
    }, [rows])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, borderRadius: 1 }}>
                    <Typography variant="h6"><strong>Sub-Task</strong></Typography>
                </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.background.main }}>
                    <Typography variant="body1"><strong>Initial Setup</strong></Typography>
                    {setupTime ? (`${setupTime.toFixed(2)} seconds`) : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.background.main }}>
                    <Typography variant="body1"><strong>Embedding Profiles</strong></Typography>
                    {modelTime ? (`${modelTime.toFixed(2)} seconds`) : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.background.main }}>
                    <Typography variant="body1"><strong>Uploading Embeddings</strong></Typography>
                    {upsertTime ? (`${upsertTime.toFixed(2)} seconds`) : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.background.main }}>
                    <Typography variant="body1"><strong>Similar Profile Search</strong></Typography>
                    {queryTime ? (`${queryTime.toFixed(2)} seconds`) : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.light, color: theme.palette.text.primary, borderRadius: 1 }}>
                    <Typography variant="h6"><strong>Selected Profile</strong></Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    {selectedProfile ? selectedProfile.description : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.light, color: theme.palette.text.primary, borderRadius: 1 }}>
                    <Typography variant="h6"><strong>Similar Profiles</strong></Typography>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                {showTable ? (
                    <React.Fragment>
                    <TableContainer component={Paper} sx={{ maxHeight: 440, boxShadow: 1, borderRadius: 1, background: theme.palette.background.paper }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: theme.palette.background.main }}>
                                <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>Profile</strong></TableCell>
                                <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>Description</strong></TableCell>
                                <TableCell align='center'><strong style={{ color: theme.palette.text.primary }}>K Score</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow hover key={row.person_id}>
                                        <TableCell>{row.person_id}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">{row.kScore.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ background: theme.palette.background.paper,  boxShadow: 1, borderRadius: 1, } }
                        /></React.Fragment>) : (<Skeleton variant='rectangular' animation="wave" />)}
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.light, color: theme.palette.text.primary, borderRadius: 1 }}>
                    <Typography variant="h6"><strong>Results</strong></Typography>
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body1"><strong>Total Time</strong></Typography>
                    {systemTime ? (`${systemTime.toFixed(2)} seconds`) : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body1"><strong>Smallest K Score</strong></Typography>
                    {kMin ? kMin.toFixed(2) : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body1"><strong>Largest K Score</strong></Typography>
                    {kMax ? kMax.toFixed(2) : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body1"><strong>Average K Score</strong></Typography>
                    {kAvg ? kAvg.toFixed(2) : <Skeleton variant='rectangular' />}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default CapstoneResTable;