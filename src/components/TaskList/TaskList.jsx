import { useState, useEffect } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";
import { TransitionGroup } from 'react-transition-group';
import CustomizedButton from "../Buttons/CustomizedButton";
import {
    Done as DoneIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';
import ActionBar from "../ActionBars/ActionBar";
import {
    ListItem,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
    IconButton,
    Input,
} from '@mui/material';

import './TaskList.css'

export default function TaskList() {
    const { toDoList, setToDoList } = useToDoList();

    const [checked, setChecked] = useState([]);
    const [checkedFade, setCheckedFade] = useState(false);
    const [taskEditInput, setTaskEditInput] = useState('')

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

    const handleClickEditTask = (id) => {
        handleClickCancelEditTask()
        const nextList = [...toDoList];
        const editingTask = nextList.find((task) => task.id === id);
        editingTask.isTaskEditing = !editingTask.isTaskEditing;
        setTaskEditInput(editingTask.title);
        setToDoList(nextList);
    }

    const handleSaveEditedTask = () => {
        const nextList = [...toDoList];
        const editingTask = nextList.find((task) => task.isTaskEditing);
        editingTask.title = taskEditInput;
        setToDoList(nextList);
        handleClickCancelEditTask();
    }

    const handleClickCancelEditTask = () => {
        const nextList = [...toDoList];
        nextList.filter((task) => task.isTaskEditing).map((task) => {
            task.isTaskEditing = false
            return task
        });
        setToDoList(nextList);
    }

    const getFormattedDate = (date) => {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        const strDate = new Date(date);
        return strDate.toLocaleString('en-US', options)

    }

    return (
        <>
            <ActionBar
                checkedFade={checkedFade}
                handleDeleteTask={handleDeleteTask}
                handleMarkTasksAsCompleted={handleMarkTasksAsCompleted}
            />

            {toDoList.length === 0 && (
                <section className="regular-box">
                    <h3>To-Do List is Currently Empty</h3>
                </section>
            )}

            {toDoList.length > 1 && (
                <section className="regular-box">
                    <CustomizedButton
                        onClick={() => setChecked(toDoList.map((task) => task.id))}
                        title={'Select All'}
                    />
                    <CustomizedButton
                        onClick={() => setChecked([])}
                        title={'Deselect All'}
                    />
                </section>
            )}
            <section>
                <List sx={{ padding: 0 }}>
                    <TransitionGroup>
                        {toDoList.map((value) => {
                            const { id, title, isCompleted, dateAdd, isTaskEditing } = value;
                            const labelId = `checkbox-list-label-${id}`;

                            return (
                                <Collapse key={id} >
                                    <ListItem
                                        key={id}
                                        secondaryAction={
                                            <>
                                                <IconButton onClick={() => handleClickEditTask(id)} >
                                                    {!isTaskEditing && <EditIcon />}
                                                </IconButton>
                                                {isTaskEditing && <>
                                                    <IconButton onClick={handleClickCancelEditTask}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                    <IconButton onClick={handleSaveEditedTask}>
                                                        <SaveIcon />
                                                    </IconButton>
                                                </>
                                                }
                                            </>
                                        }
                                        disablePadding
                                    >
                                        {isTaskEditing &&
                                            <ListItemButton className="list-item-button">
                                                <Input
                                                    value={taskEditInput}
                                                    onChange={(e) => setTaskEditInput(e.target.value)}
                                                    className="input-custom"
                                                    fullWidth
                                                    autoFocus
                                                />


                                            </ListItemButton>
                                        }

                                        {!isTaskEditing &&
                                            <ListItemButton onClick={handleToggle(id)}>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        id={id}
                                                        edge="start"
                                                        checked={checked.indexOf(id) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                        sx={{
                                                            '&.Mui-checked': {
                                                                color: '#ffa500'
                                                            },
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={`${title}`}
                                                    secondary={`${getFormattedDate(dateAdd)}`}
                                                    className={isCompleted
                                                        ? 'item-task-text-completed'
                                                        : 'item-task-text'}
                                                />

                                            </ListItemButton>}
                                        {isCompleted && <DoneIcon />}
                                    </ListItem>
                                </Collapse>
                            );
                        })}
                    </TransitionGroup>
                </List>
            </section >
        </>
    );
}