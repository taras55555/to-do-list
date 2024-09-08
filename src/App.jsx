import Header from './components/Header/Header'
import TaskList from "./components/TaskList/TaskList"
import TaskInputToggle from "./components/Forms/TaskInputToggle"
import './App.css'

export default function App() {

  return (
    <>
      <Header />
      <main>
        <div className="fixed-container new-task-controls">
          <TaskInputToggle />
        </div>

        <TaskList />
      </main >
    </>
  )
}