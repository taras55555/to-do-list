import Header from './components/Header/Header'
import TaskList from "./components/TaskList/TaskList"
import TaskInputToggle from "./components/Forms/TaskInputToggle"
import './App.css'

export default function App() {

  return (
    <>
      <Header />
      <main>
        <section className="fixed-container new-task-controls">
          <TaskInputToggle />
        </section>

        <TaskList />
      </main >
    </>
  )
}