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

export default function ActionBar({ checkedFade, handleDeleteTask, handleMarkTasksAsCompleted, handleCopyToClipboard }) {
    return (
        <section className="fixed-container action-bar-container">
            <Fade in={checkedFade} timeout={500}>
                <div className="action-bar">
                    <Tooltip title="Mark As Complited">
                        <IconButton color="success" onClick={() => handleMarkTasksAsCompleted(true)}>
                            <TaskAltIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark As Incomplete">
                        <IconButton onClick={() => handleMarkTasksAsCompleted(false)}>
                            <RadioButtonUncheckedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Selected">
                        <IconButton color="error" onClick={handleDeleteTask}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy Selected" onClick={handleCopyToClipboard}>
                        <IconButton>
                            <CopyAllIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Fade>
        </section>
    )
}