import React, { useState, createContext, useContext, useEffect } from "react";

const ToDoListContext = createContext();

export function ToDoListProvider({ children }) {

    const [toDoList, setToDoList] = useState(JSON.parse(localStorage.getItem('ToDoList')) || []);
    const [toggleNewTaskButton, setToggleNewTaskButton] = useState(true);

    useEffect(() => {
        document.title = `To-Do List`
    }, [])

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('ToDoList')))
        localStorage.setItem('ToDoList', JSON.stringify(toDoList))
    }, [toDoList])

    return (
        <ToDoListContext.Provider value={{ toDoList, setToDoList, toggleNewTaskButton, setToggleNewTaskButton }}>
            {children}
        </ToDoListContext.Provider>
    )
}

export function useToDoList() {
    return useContext(ToDoListContext);
};