import { useState } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function NewTaskForm() {

    const [newTaskValue, setNewTaskValue] = useState('')
    const [dialog, setDialog] = useState({ open: false });

    const { toDoList, setToDoList, toggleNewTaskButton, setToggleNewTaskButton } = useToDoList();

    function handleValidateTask(e) {
        e.preventDefault();

        const open = toDoList.filter((task) => task.title === newTaskValue).length > 0;

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
        setToDoList([
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

    const handleClose = () => {
        setDialog({
            ...dialog,
            open: false
        })
    };

    const {
        dialogTitle = '',
        dialogContentText = '',
        open = false,
        type
    } = dialog;

    return (
        <>
            <form>
                <input
                    type="text"
                    value={newTaskValue}
                    onChange={e => setNewTaskValue(e.target.value)}
                    autoFocus
                />
                <button onClick={handleValidateTask}>Add Task</button>
            </form>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogContentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {type === 'prompt' && (
                        <>
                            <button onClick={handleClose}>
                                Disagree
                            </button>
                            <button onClick={handleNewTask} autoFocus>
                                Agree
                            </button>
                        </>
                    )}
                    {type === 'alert' && (
                        <>
                            <button onClick={handleClose}>
                                OK
                            </button>
                        </>
                    )}

                </DialogActions>
            </Dialog>
        </>
    )
}