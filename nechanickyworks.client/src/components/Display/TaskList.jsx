import * as React from 'react';
import { List, ListItemButton, ListItem, Stack, IconButton, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { useWebSocket } from '../Shared/WebsocketContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { WebSocketQueue } from '../Shared/WebSocketManager';
import WebSocketTask from '../Shared/WebSocketTask';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';

const TaskList = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [showLogs, setShowLogs] = React.useState(false);

    const blurRef = React.useRef([]);

    //const { queue } = useWebSocket();
    const queue = new WebSocketQueue();

    for (var i = 0; i <= 4; i++) {
        const task = new WebSocketTask(
            'FakeUrl${i}',
            'FakeName${i}',
            'FakePageLink${i}',
            { fakeKey: 'fakeKey${i}' }
        );
        if (i === 0) {
            task.taskStatus = "Running";
        }
        queue.push(task);
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        event.stopPropagation();
    }

    const handleVisibilityClick = (event) => {
        setShowLogs(!showLogs);
        event.stopPropagation();
    }

    const handleCancelClick = (event, item) => {
        console.log('Cancel action for', item.taskName);
        event.stopPropagation();
    }

    const LogVisibility = ({isVisible, hidden, onVisibilityClick}) => {
        if (!hidden) {
            return isVisible ? (
                <IconButton edge="end" aria-label="Hide Logs" onClick={onVisibilityClick}>
                    <VisibilityIcon />
                </IconButton>
            ) : (
                    <IconButton edge="end" aria-label="Show Logs" onClick={onVisibilityClick}>
                    <VisibilityOffIcon />
                </IconButton>
            );
        }
        return null;
    }

    return (
        <React.Fragment>
            <List component='nav' sx={{width: '100%', bgcolor: 'background.paper'}}>
                {queue.queue.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                    >
                        <ListItemButton
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    {index}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>{item.taskName}</ListItemText>
                            <Stack direction="row" spacing={1}>
                                <LogVisibility hidden={item.taskStatus !== "Running"} isVisible={showLogs} onVisibilityClick={(event) => handleVisibilityClick(event)} />
                                <IconButton edge="end" aria-label="Cancel Task" onClick={(event) => handleCancelClick(event, item)}>
                                    <CancelIcon />
                                </IconButton>
                            </Stack>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}

export default TaskList;