import { useState, useEffect } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";
import { TransitionGroup } from 'react-transition-group';
import { Done as DoneIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, } from '@mui/icons-material';
import ActionBar from "../ActionBars/ActionBar";
import { ListItem, List, ListItemButton, ListItemIcon, ListItemText, Checkbox, Collapse, IconButton, Input, } from '@mui/material';
import './TaskList.css'
import ActionButtons from "../ActionBars/ActionButtons";
import TaskInputToggle from "../Forms/TaskInputToggle";

export default function TaskList() {
    const { toDoList, setToDoList } = useToDoList();
    const [activeFilter, setActiveFilter] = useState({});
    const [checked, setChecked] = useState([]);
    const [checkedFade, setCheckedFade] = useState(false);
    const [taskEditInput, setTaskEditInput] = useState('')

    useEffect(() => setCheckedFade(checked.length > 0), [checked]);
    useEffect(() => setChecked([]), [activeFilter]);

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
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const strDate = new Date(date);
        return strDate.toLocaleString('en-US', options)
    }

    const displayedTasks = () => {
        const { active, done } = activeFilter;
        if (done) {
            return toDoList.filter((task) => task.isCompleted);
        } else if (active) {
            return toDoList.filter((task) => !task.isCompleted);
        } else {
            return toDoList
        }
    }

    const calculateTaskStatus = () => {
        return toDoList.reduce((acc, task) => {
            if (task.isCompleted) {
                acc.done = ++acc.done || 1
            } else {
                acc.active = ++acc.active || 1
            }
            return acc;
        }, { all: toDoList.length })
    }

    const handleCopyToClipboard = async () => {
        try {
            const filteredToDoList = toDoList.filter((task) => checked.includes(task.id));
            await navigator.clipboard.writeText(filteredToDoList.map((task) => task.title).join('\n'));
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (
        <main>
            <ActionBar
                checkedFade={checkedFade}
                handleDeleteTask={handleDeleteTask}
                handleMarkTasksAsCompleted={handleMarkTasksAsCompleted}
                handleCopyToClipboard={handleCopyToClipboard}
            />

            <ActionButtons
                toDoList={toDoList}
                setChecked={setChecked}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                calculateTaskStatus={calculateTaskStatus} />

            {toDoList.length === 0 && (
                <section className="regular-box">
                    <h3>To-Do List is Currently Empty</h3>
                </section>
            )}

            <section>
                <List sx={{ padding: 0, margin: '30px 0' }}>
                    <TransitionGroup>
                        {displayedTasks().map((value) => {
                            const { id, title, isCompleted, dateAdd, isTaskEditing } = value;
                            const labelId = `checkbox-list-label-${id}`;

                            return (
                                <Collapse key={id} >
                                    <ListItem
                                        key={id}
                                        secondaryAction={
                                            <>
                                                {!isTaskEditing &&
                                                    <IconButton onClick={() => handleClickEditTask(id)} >
                                                        <EditIcon />
                                                    </IconButton>}

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
            <TaskInputToggle />
        </main>
    );
}