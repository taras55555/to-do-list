import { useState, useEffect } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";
import { TransitionGroup } from 'react-transition-group';
import CustomizedButton from "../Buttons/CustomizedButton";
import { Done as DoneIcon } from '@mui/icons-material';
import ActionBar from "../ActionBars/ActionBar";
import {
    ListItem,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse
} from '@mui/material';

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
                            const { id, title, isCompleted } = value;
                            const labelId = `checkbox-list-label-${id}`;

                            return (
                                <Collapse key={id} >
                                    <ListItem
                                        key={id}
                                        disablePadding

                                    >
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
                                                className={isCompleted
                                                    ? 'item-task-text-completed'
                                                    : 'item-task-text'}
                                            />
                                            {isCompleted && <DoneIcon />}
                                        </ListItemButton>
                                    </ListItem>
                                </Collapse>
                            );
                        })}
                    </TransitionGroup>
                </List>
            </section>
        </>
    );
}