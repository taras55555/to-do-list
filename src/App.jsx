import { useToDoList } from "./contexts/ToDoListContext";
import NewTaskForm from "./components/Forms/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";
import CustomizedButton from "./components/Buttons/CustomizedButton";
import {Box} from '@mui/material';

export default function App() {
  const { toDoList, toggleNewTaskButton, setToggleNewTaskButton } = useToDoList();

  function handleToggleAddTaskForm() {
    setToggleNewTaskButton(!toggleNewTaskButton);
  }

  return (
    <main>
      <section>
        <header>
          <h1>To-Do List</h1>
        </header>

        {toDoList.length === 0 && 'To-Do List is Currently Empty'}
        <TaskList />
        <Box className='mui-box'>
          {toggleNewTaskButton
            ? (<CustomizedButton
              onClick={handleToggleAddTaskForm}
              title={'Add Task'}
            />)
            : (<NewTaskForm />)}
        </Box>
      </section>
    </main>
  )
}