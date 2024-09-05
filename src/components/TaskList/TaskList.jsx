import { useState } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import {
    Edit as EditIcon,
    DeleteForever as DeleteForeverIcon,
    TaskAlt as TaskAltIcon,
} from '@mui/icons-material';

import './TaskList.css'

export default function TaskList() {
    const { toDoList, setToDoList } = useToDoList();
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {checked.length > 0 && (
                <div className="fixed-container">
                    <div className="action-bar">
                        <IconButton edge="end" color="success" aria-label="comments">
                            <TaskAltIcon />
                        </IconButton>
                        <IconButton edge="end" color="secondary" aria-label="comments">
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" color="error" aria-label="comments" >
                            <DeleteForeverIcon />
                        </IconButton>
                    </div>
                </div>)
            }
            
            {toDoList.map((value) => {
                const { id, title } = value;
                const labelId = `checkbox-list-label-${id}`;

                return (
                    <ListItem
                        key={id}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(id)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${title}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}