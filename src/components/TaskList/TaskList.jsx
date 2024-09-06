import { useState, useEffect } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import {
    Edit as EditIcon,
    DeleteForever as DeleteForeverIcon,
    TaskAlt as TaskAltIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    Done as DoneIcon,
    CopyAll as CopyAllIcon
} from '@mui/icons-material';

import './TaskList.css'

export default function TaskList() {
    const { toDoList, setToDoList } = useToDoList();
    const [checked, setChecked] = useState([]);
    const [checkedFade, setCheckedFade] = useState(false);

    useEffect(() => setCheckedFade(checked.length > 0), [checked]);

    const handleMarkTasksAsCompleted = (isChecked) => {
        const nextList = [...toDoList];

        checked.forEach((taskId) => {
            const record = nextList.find((task) => task.id === taskId);
            record.isCompleted = isChecked ? true : false;
        })
        setToDoList(nextList);
        setChecked([]);
    }

    const handleDeleteTask = () => {
        const filteredToDoList = toDoList.filter((task) => !(checked.includes(task.id)));
        setToDoList(filteredToDoList);
        setChecked([]);
    }

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
        <List sx={{
            width: '100%',
            bgcolor: 'background.paper'
        }}>

            <div className="fixed-container">
                <Fade in={checkedFade} timeout={500}>
                    <div className="action-bar">
                        <IconButton color="success" onClick={() => handleMarkTasksAsCompleted(true)}>
                            <TaskAltIcon />
                        </IconButton>
                        <IconButton onClick={() => handleMarkTasksAsCompleted(false)}>
                            <RadioButtonUncheckedIcon />
                        </IconButton>
                        <Tooltip title="Edit">
                            <IconButton color="secondary">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="error" onClick={handleDeleteTask}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy">
                            <IconButton>
                                <CopyAllIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Fade>
            </div>

            {toDoList.length > 1 && (
                <>
                    <button onClick={() => setChecked(toDoList.map((task) => task.id))}>Select All</button>
                    <button onClick={() => setChecked([])}>Deselect All</button>
                </>
            )}

            <TransitionGroup>

                {toDoList.map((value) => {
                    const { id, title, isCompleted } = value;
                    const labelId = `checkbox-list-label-${id}`;

                    return (
                        <Collapse key={id}>
                            <ListItem
                                key={id}
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(id)} sx={{ borderBottom: '1px solid gray' }}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={labelId}
                                        primary={`${title}`}
                                        className={isCompleted
                                            ? 'item-task-text-completed'
                                            : 'item-task-text'}
                                    />
                                    {isCompleted && (<IconButton edge="end" color="success">
                                        <DoneIcon />
                                    </IconButton>)}
                                </ListItemButton>
                            </ListItem>
                        </Collapse>
                    );
                })}
            </TransitionGroup>
        </List>
    );
}