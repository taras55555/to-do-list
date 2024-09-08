import { useToDoList } from '../../contexts/ToDoListContext';

import { Box } from '@mui/material';

import CustomizedButton from '../Buttons/CustomizedButton';
import NewTaskForm from './NewTaskForm';

export default function TaskInputToggle() {
    const { toggleNewTaskButton, setToggleNewTaskButton } = useToDoList();

    function handleToggleAddTaskForm() {
        setToggleNewTaskButton(!toggleNewTaskButton);
    }

    return (
        <section className='regular-box'>
            {toggleNewTaskButton
                ? (<CustomizedButton
                    onClick={handleToggleAddTaskForm}
                    title={'Add Task'}
                />)
                : (<NewTaskForm />)}
        </section>
    )
}