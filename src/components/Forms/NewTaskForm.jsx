import { useState } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";

import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField
} from '@mui/material';
import CustomizedButton from "../Buttons/CustomizedButton";

export default function NewTaskForm() {

    const [newTaskValue, setNewTaskValue] = useState('')
    const [dialog, setDialog] = useState({ open: false });

    const { toDoList, setToDoList, toggleNewTaskButton, setToggleNewTaskButton } = useToDoList();

    function handleValidateTask(e) {
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

    const handleClose = () => setDialog({ ...dialog, open: false });

    const {
        dialogTitle = '',
        dialogContentText = '',
        open = false,
        type
    } = dialog;

    return (
        <>
            <Box sx={{ display: 'flex', gap: '10px' }}>
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
            </Box>

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
                    <Stack direction="row" spacing={2}>
                        {type === 'prompt' && (
                            <>
                                <CustomizedButton
                                    title={'Disagree'}
                                    onClick={handleClose}
                                />

                                <CustomizedButton
                                    title={'Agree'}
                                    onClick={handleNewTask}
                                />
                            </>
                        )}

                        {type === 'alert' && (
                            <>
                                <CustomizedButton
                                    title={'OK'}
                                    onClick={handleClose}
                                />
                            </>
                        )}
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}