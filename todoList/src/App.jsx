import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/todoform/TodoForm'
import Tabs from './components/tabs/Tabs'
import Todolist from './components/todolist/todolist'
import { getRecordsFormLocal, storeDataLocal } from './components/utils/storage'

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All")
  const [task, setTask] = useState();
  const [message, setMessage] = useState();

  const handleAddTask = (taskTitle, id = "") => {
    const taskId = tasks && tasks.length > 0 ? Math.max(...tasks?.map((item) => item.id)) + 1
      : 1;
    let availableTask
    let alertMessage = ''
    if (id != "") {
      availableTask = tasks.map((item) => item.id === id ? { ...item, title: taskTitle } : item);
      alertMessage = "Task has been update successfully!"
    } else {
      const newTask = { id: taskId, title: taskTitle, isComplete: false };
      availableTask = [...tasks, newTask];
      alertMessage = "Task has been added successfully!"
    }
    setMessage(alertMessage);
    setTimeout(() => {
      setMessage();
    }, 5000);
    setTasks(availableTask);
    storeDataLocal("localTasks", availableTask);
    setTask();
  }

  useEffect(() => {
    const records = getRecordsFormLocal("localTasks");
    if (records) {
      setTasks(records);
    }
  }, []);

  return (
    <div className='container'>
      <div className='app_title'>Todo App</div>
      {message && <div className='alert success'>{message}</div>}
      <TodoForm handleAddTask={handleAddTask} task={task} />
      <Tabs setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <Todolist tasks={tasks} setTasks={setTasks} fileter={selectedTab} setTask={setTask} />
    </div>
  )
}

export default App
