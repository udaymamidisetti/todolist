import {v4 as uuidv4} from 'uuid'
import {useState} from 'react'
import './App.css'

function ToDoList() {
  const [tasks, setTasks] = useState([])
  const [enteredTask, setEnteredTask] = useState('')
  const [completedTasks, setCompletedTasks] = useState([])

  const onChangeInput = event => {
    setEnteredTask(event.target.value)
  }

  const addTask = event => {
    event.preventDefault()
    if (enteredTask.trim() === '') {
      return
    }
    setTasks([...tasks, enteredTask])
    setEnteredTask('')
  }

  const completeTask = id => {
    const newTasks = [...tasks]
    const task = newTasks.splice(id, 1)[0]
    setTasks(newTasks)
    setCompletedTasks([...completedTasks, task])
  }

  const deleteTask = id => {
    const newTasks = [...tasks]
    newTasks.splice(id, 1)
    setTasks(newTasks)
  }

  const deleteCompletedTask = id => {
    const completedTask = [...completedTasks]
    completedTask.splice(id, 1)
    setCompletedTasks(completedTask)
  }

  return (
    <>
      <div className="app">
        <h1 className="heading">To-Do List</h1>
        <form onSubmit={addTask}>
          <input
            type="text"
            className="input"
            value={enteredTask}
            onChange={onChangeInput}
            placeholder="Please Enter the Task"
          />

          <div className="button">
            <button type="submit" className="button__element">
              Add Task
            </button>
          </div>
        </form>
        <ul>
          {tasks.map(task => (
            <>
              <li style={{marginBottom: 10}} key={uuidv4()}>
                {task}
              </li>
              <button
                type="button"
                onClick={() => completeTask(uuidv4())}
                className="complete__button"
              >
                Complete
              </button>
              <button
                type="button"
                onClick={() => deleteTask(uuidv4())}
                className="delete__button"
              >
                Delete
              </button>
            </>
          ))}
        </ul>
      </div>
      <div className="completed__screen">
        <h1 className="heading">Completed Tasks</h1>
        <ul>
          {completedTasks.map(task => (
            <li key={uuidv4()} style={{margin: 10}}>
              {task}
              <button
                type="button"
                className="delete__button"
                onClick={() => deleteCompletedTask(uuidv4())}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ToDoList
