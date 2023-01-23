import React from 'react'
import {CiEdit} from "react-icons/ci"
import {MdDeleteForever} from "react-icons/md"
import './ToDoComponent.css';

const ToDo = ({title,changeToUpdateMode,deleteToDo}) => {
  return (
    <div className='todo'>
        <div className='title'>{title}</div>
        <div className='icons'>
            <CiEdit className="icon" onClick={changeToUpdateMode}/>
            <MdDeleteForever className="icon" onClick={deleteToDo}/>
        </div>
        </div>
  )
}

export default ToDo