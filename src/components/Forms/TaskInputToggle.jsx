import { useState } from "react";
import { useToDoList } from '../../contexts/ToDoListContext';
import { TextField } from '@mui/material';
import ValidateTaskDialog from "../Dialogs/ValidateTaskDialog";
import CustomizedButton from '../Buttons/CustomizedButton';
import './TaskInputToggle.css';

export default function TaskInputToggle() {
    const [newTaskValue, setNewTaskValue] = useState('');
    const [dialog, setDialog] = useState({ open: false });
    const { toDoList, setToDoList, toggleNewTaskButton, setToggleNewTaskButton } = useToDoList();

    function handleValidateTask() {
        const open = toDoList.filter((task) => task.title.toLowerCase() === newTaskValue.toLowerCase()).length > 0;
        if (open) {
            setDialog({
                dialogTitle: 'This task already exists in the to-do list',
                dialogContentText: 'Do you want to add it again?',
                open,
                type: 'prompt'
            })
            return;
        }

        if (newTaskValue.trim() === '') {
            setDialog({
                dialogTitle: 'The task title cannot be empty',
                dialogContentText: 'Please enter a task.',
                open: true,
                type: 'alert'
            })
            return;
        }
        handleNewTask();
    }

    function handleNewTask() {
        setToDoList((toDoList) => [
            ...toDoList,
            {
                id: self.crypto.randomUUID(),
                title: newTaskValue,
                dateAdd: Date.now()
            }
        ]);
        setNewTaskValue('');
        setToggleNewTaskButton(!toggleNewTaskButton);
    }

    function handleToggleAddTaskForm() {
        setToggleNewTaskButton(!toggleNewTaskButton);
    }

    function handleValidateTask() {
        const open = toDoList.filter((task) => task.title.toLowerCase() === newTaskValue.toLowerCase()).length > 0;
        if (open) {
            setDialog({
                dialogTitle: 'This task already exists in the to-do list',
                dialogContentText: 'Do you want to add it again?',
                open,
                type: 'prompt'
            })
            return;
        }

        if (newTaskValue.trim() === '') {
            setDialog({
                dialogTitle: 'The task title cannot be empty',
                dialogContentText: 'Please enter a task.',
                open: true,
                type: 'alert'
            })
            return;
        }
        handleNewTask();
    }

    function handleNewTask() {
        setToDoList((toDoList) => [
            ...toDoList,
            {
                id: self.crypto.randomUUID(),
                title: newTaskValue,
                dateAdd: Date.now()
            }
        ]);
        setNewTaskValue('');
        setToggleNewTaskButton(!toggleNewTaskButton);
        setDialog({ open: false });
    }

    return (<>
        {!toggleNewTaskButton && <div className="modal" onClick={handleToggleAddTaskForm} />}
        <section className="fixed-container new-task-controls">
            {toggleNewTaskButton
                ? (<CustomizedButton
                    onClick={handleToggleAddTaskForm}
                    title={'Add Task'}
                />)
                : (<div className='new-task-box new-task-box-structure'>
                    <h2>New Task</h2>
                    <TextField
                        size="small"
                        type="text"
                        value={newTaskValue}
                        onChange={e => setNewTaskValue(e.target.value)}
                        autoFocus
                    />

                    <CustomizedButton
                        title={'Add Task'}
                        onClick={handleValidateTask}
                    />

                    <ValidateTaskDialog
                        dialog={dialog}
                        setDialog={setDialog}
                        handleNewTask={handleNewTask}
                    />
                </div>)
            }
        </section>
    </>)
}