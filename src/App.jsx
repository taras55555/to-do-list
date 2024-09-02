import { useState } from "react";

import { useToDoList } from "./contexts/ToDoListContext";
import NewTaskForm from "./components/Forms/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";
import NewTaskButton from "./components/Buttons/NewTaskButton";

export default function App() {

  const [newTaskValue, setNewTaskValue] = useState('')

  const { toDoList, setToDoList, toggleNewTaskButton, setToggleNewTaskButton } = useToDoList();

  function handleToggleAddTaskForm() {
    setToggleNewTaskButton(!toggleNewTaskButton);
  }

  return (
    <>
      <h1>To-Do List</h1>

      {toDoList.length === 0 && 'To-Do List is Currently Empty'}
      <TaskList />
      <div>
        {toggleNewTaskButton
          ? (<NewTaskButton
            onClick={handleToggleAddTaskForm}
            title={'Add Task'}
          />)
          : (<NewTaskForm />)}
      </div>
    </>
  )
}