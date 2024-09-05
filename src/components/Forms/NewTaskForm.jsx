import { useState } from "react";
import { useToDoList } from "../../contexts/ToDoListContext";

export default function NewTaskForm() {

    const [newTaskValue, setNewTaskValue] = useState('')
    const { toDoList, setToDoList, toggleNewTaskButton, setToggleNewTaskButton } = useToDoList();

    function handleNewTask(e) {
        e.preventDefault();

        if (newTaskValue.trim() === '') {
            return;
        }

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

    return (
        <form>
            <input
                type="text"
                value={newTaskValue}
                onChange={e => setNewTaskValue(e.target.value)}
                autoFocus
            />
            <button onClick={handleNewTask}>Add Task</button>
        </form>
    )
}