export default function NewTaskButton({onClick, title}) {
    return  (
        <button onClick={onClick}>{title}</button>
    )
}