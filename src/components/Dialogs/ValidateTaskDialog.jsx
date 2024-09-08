import CustomizedButton from "../Buttons/CustomizedButton";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack
} from '@mui/material';

export default function ValidateTaskDialog({ dialog, setDialog, handleNewTask }) {
    const {
        dialogTitle = '',
        dialogContentText = '',
        open = false,
        type
    } = dialog;

    const handleClose = () => setDialog({ ...dialog, open: false });

    return (
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
                    <Stack direction="row" spacing={2}>
                        <CustomizedButton
                            title={'Disagree'}
                            onClick={handleClose}
                        />

                        <CustomizedButton
                            title={'Agree'}
                            onClick={handleNewTask}
                        />
                    </Stack>
                )}

                {type === 'alert' && (
                    <Stack direction="row" spacing={2}>
                        <CustomizedButton
                            title={'OK'}
                            onClick={handleClose}
                        />
                    </Stack>
                )}

            </DialogActions>
        </Dialog>
    )
}