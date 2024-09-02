import { useToDoList } from "../../contexts/ToDoListContext";

export default function TaskList() {
    const { toDoList, setToDoList } = useToDoList();

    return (
        <>
            {
                toDoList.map((task) => {
                    const { id, title } = task;
                    return (
                        <div key={id}>
                            {title}
                        </div>
                    )
                })
            }
        </>

    )

}