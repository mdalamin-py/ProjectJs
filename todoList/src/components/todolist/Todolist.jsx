import React, { useEffect, useState } from 'react'
import "./todolist.css"
import CheckIcon from '../icons/CheckIcon';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { storeDataLocal } from '../utils/storage';


const todolist = ({ tasks, setTasks, fileter, setTask }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const handleClickAction = (id, action) => {
    switch (action) {
      case "markAsDone": {
        const FilterTasks = tasks.map((item) =>
          item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
        );

        setTasks(FilterTasks);
        storeDataLocal("localTasks", FilterTasks);
        break;
      }

      case "delete": {
        if (confirm("Are you sure want to delete this item?")) {
          const FilterTasks = tasks.filter((item) =>
            item.id !== id);
          setTasks(FilterTasks);
          storeDataLocal("localTasks", FilterTasks);
        }
      }

      default:
        break;
    }
  }

  useEffect(() => {
    if (tasks?.length === 0) {
      setFilteredTasks([]);
      return;
    }
    let result;
    switch (fileter) {
      case "Active": {
        result = tasks.filter((item) => !item?.isCompleted);
        break;
      }
      case "Completed": {
        result = tasks.filter((item) => item?.isCompleted);
        break;
      }
      default:
        result = tasks;
    }
    setFilteredTasks(result);
  }, [fileter, tasks]);

  return (
    <div className='list_container'>
      <ul className='list_items_ul'>
        {(!filteredTasks || filteredTasks?.length === 0) && <li className='list_item'>No task available.</li>}
        {filteredTasks && filteredTasks?.length > 0 && filteredTasks?.map(task =>
          <li className='list_item' key={'item_${task?.id}'}>
            <div className='list_title'>
              <span onClick={() => handleClickAction(task?.id, "markAsDone")}> <CheckIcon checked={task?.isCompleted} /></span>
              {task.title}
            </div>
            <div className='list_actions'>
              <span title='Edit' onClick={() => setTask(task)}><EditIcon checked={true} /></span>
              <span title='Delete' onClick={() => handleClickAction(task?.id, "delete")}><DeleteIcon checked={true} /></span>
            </div>
          </li>)
        }
      </ul>
    </div>
  )
};
export default todolist