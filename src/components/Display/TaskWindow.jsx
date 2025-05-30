import * as React from 'react';
import { Popover, Fab } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TaskList from './TaskList';


const TaskWindow = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.target.blur();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'queue-popover' : undefined;

    return (
        <React.Fragment>
            <Fab
                sx={{
                    position: 'fixed',
                    top: 75,
                    right: 16,
                }}
                onClick={ handleClick }
            >
                <ListAltIcon />
            </Fab>
            <Popover
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                id={id}
                slotProps={{
                    paper: {
                        style: { width: "35vw", minHeight: "20vh"},
                        square: false
                    }
                }}
                sx={{ width: '100%'}}
            >
                <TaskList/>
            </Popover>
        </React.Fragment>
    );
}

export default TaskWindow;