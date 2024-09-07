import { useState, useEffect, memo } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";
import {
    Box,
    ListItem,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    IconButton,
    Collapse,
    Fade,
    Tooltip
} from '@mui/material';

import { TransitionGroup } from 'react-transition-group';
import CustomizedButton from "../Buttons/CustomizedButton";
import {
    Edit as EditIcon,
    DeleteForever as DeleteForeverIcon,
    TaskAlt as TaskAltIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    Done as DoneIcon,
    CopyAll as CopyAllIcon
} from '@mui/icons-material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        ochre: {
            main: '#ffa500',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#fff',
        }
    }
})

import './TaskList.css'

// const ListItemBlock = memo(
//     function ListItemBlock({ id, title, isCompleted }) {

//         return (
//             <Collapse key={id}>
//                 <ListItem
//                     key={id}
//                     disablePadding
//                 >
//                     <ListItemButton onClick={handleToggle(id)} sx={{ borderBottom: '1px solid orange' }}>
//                         <ListItemIcon>
//                             <Checkbox
//                             id={id}
//                                 edge="start"
//                                 checked={checked.indexOf(id) !== -1}
//                                 tabIndex={-1}
//                                 disableRipple
//                                 inputProps={{ 'aria-labelledby': labelId }}
//                                 sx={{
//                                     '&.Mui-checked': {
//                                         color: '#ffa500'
//                                     },
//                                 }}
//                             />
//                         </ListItemIcon>
//                         <ListItemText
//                             id={labelId}
//                             primary={`${title}`}
//                             className={isCompleted
//                                 ? 'item-task-text-completed'
//                                 : 'item-task-text'}
//                         />
//                         {isCompleted && (<IconButton edge="end" color="success">
//                             <DoneIcon />
//                         </IconButton>)}
//                     </ListItemButton>
//                 </ListItem>
//             </Collapse>
//         )
//     }
// )

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

    // const ListItemBlock = memo(function ListItemBlock({ id, title, isCompleted }) {
    //     const labelId = `checkbox-list-label-${id}`;

    //     return (
    // <ListItemButton onClick={handleToggle(id)} sx={{ borderBottom: '1px solid orange' }}>
    //     <ListItemIcon>
    //         <Checkbox
    //             edge="start"
    //             checked={checked.indexOf(id) !== -1}
    //             tabIndex={-1}
    //             disableRipple
    //             inputProps={{ 'aria-labelledby': labelId }}
    //             sx={{
    //                 '&.Mui-checked': {
    //                     color: '#ffa500'
    //                 },
    //             }}
    //         />
    //     </ListItemIcon>
    //     <ListItemText
    //         id={labelId}
    //         primary={`${title}`}
    //         className={isCompleted
    //             ? 'item-task-text-completed'
    //             : 'item-task-text'}
    //     />
    //     {isCompleted && (<IconButton edge="end" color="success">
    //         <DoneIcon />
    //     </IconButton>)}
    // </ListItemButton>
    //     )
    // }
    // )

    return (
        <List sx={{
            width: '100%',
            bgcolor: 'background.paper'
        }}>

            <div className="fixed-container">
                <Fade in={checkedFade} timeout={500}>
                    <div className="action-bar">
                        <IconButton color="success" onClick={() => handleMarkTasksAsCompleted(true)}>
                            <TaskAltIcon />
                        </IconButton>
                        <IconButton onClick={() => handleMarkTasksAsCompleted(false)}>
                            <RadioButtonUncheckedIcon />
                        </IconButton>
                        <Tooltip title="Edit">
                            <IconButton color="secondary">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton color="error" onClick={handleDeleteTask}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy">
                            <IconButton>
                                <CopyAllIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Fade>
            </div>

            {toDoList.length > 1 && (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <CustomizedButton
                        onClick={() => setChecked(toDoList.map((task) => task.id))}
                        title={'Select All'}
                    />
                    <CustomizedButton
                        onClick={() => setChecked([])}
                        title={'Deselect All'}
                    />
                </Box>
            )}

            <TransitionGroup>
                {toDoList.map((value) => {
                    const { id, title, isCompleted } = value;
                    const labelId = `checkbox-list-label-${id}`;

                    return (

                        <Collapse key={id}>
                            <ListItem
                                key={id}
                                disablePadding
                            >
                                <ListItemButton onClick={handleToggle(id)} sx={{ borderBottom: '1px solid orange' }}>
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
                                    {isCompleted && (<IconButton edge="end" color="success">
                                        <DoneIcon />
                                    </IconButton>)}
                                </ListItemButton>
                            </ListItem>
                        </Collapse>
                    );
                })}
            </TransitionGroup>
        </List>
    );
}