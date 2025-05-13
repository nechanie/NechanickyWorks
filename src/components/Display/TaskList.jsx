import * as React from 'react';
import { List, ListItemButton, ListSubheader, ListItem, Stack, IconButton, ListItemAvatar, ListItemText, Typography, Avatar, Divider } from '@mui/material';
import { useWebSocket } from '../Shared/WebsocketContext';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { TaskStatus } from '../Shared/WebSocketManager';

const TaskList = () => {

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showLogs, setShowLogs] = useState(false);

    const { queue } = useWebSocket();
    const [queueItems, setQueueItems] = useState([]);

    useEffect(() => {
        setQueueItems(queue());
    }, [queue]);


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
    console.log(queueItems.values());
    return (
        <React.Fragment>
            <List component='nav' dense={true} sx={{ bgcolor: 'background.paper' }} subheader={<ListSubheader>Job Queue</ListSubheader>}>
                <Divider flexItem/>
                {queueItems.map((item, index) => (
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
                            <ListItemText disableTypography={true}>
                                <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.taskName}</Typography>
                            </ListItemText>
                        </ListItemButton>
                        <Divider orientation="vertical" variant="middle" sx={{ marginLeft: "2%", marginRight: "2%" }} flexItem/>
                        <Stack direction="row" spacing={1}>
                            <LogVisibility hidden={item.taskStatus !== TaskStatus.RUNNING} isVisible={showLogs} onVisibilityClick={(event) => handleVisibilityClick(event)} />
                            <IconButton edge="end" aria-label="Cancel Task" onClick={(event) => handleCancelClick(event, item)}>
                                <CancelIcon />
                            </IconButton>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}

export default TaskList;