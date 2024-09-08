import { useState } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";
import CustomizedButton from "../Buttons/CustomizedButton";
import { TextField } from '@mui/material';
import ValidateTaskDialog from "../Dialogs/ValidateTaskDialog";

export default function NewTaskForm() {
    const [newTaskValue, setNewTaskValue] = useState('')
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

    return (
        <>
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
        </>
    )
}