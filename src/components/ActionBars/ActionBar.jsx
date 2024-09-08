import {
    IconButton,
    Fade,
    Tooltip
} from '@mui/material'

import {
    DeleteForever as DeleteForeverIcon,
    TaskAlt as TaskAltIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    CopyAll as CopyAllIcon
} from '@mui/icons-material'

import './ActionBar.css'

export default function ActionBar({ checkedFade, handleDeleteTask, handleMarkTasksAsCompleted }) {
    return (
        <div className="fixed-container action-bar-container">
            <Fade in={checkedFade} timeout={500}>
                <div className="action-bar">
                    <IconButton color="success" onClick={() => handleMarkTasksAsCompleted(true)}>
                        <TaskAltIcon />
                    </IconButton>
                    <IconButton onClick={() => handleMarkTasksAsCompleted(false)}>
                        <RadioButtonUncheckedIcon />
                    </IconButton>
                    <Tooltip title="Delete Selected">
                        <IconButton color="error" onClick={handleDeleteTask}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy Selected">
                        <IconButton>
                            <CopyAllIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Fade>
        </div>
    )
}