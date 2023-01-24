import React from 'react'
import {CiEdit} from "react-icons/ci"
import {MdDeleteForever} from "react-icons/md"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ToDoComponent.css';
// const contentStyle = { background: '#fff',color: '#000' };

const ToDo = ({title,description,date,isChecked,checkToDo,changeToUpdateMode,deleteToDo}) => {
  return (
    <div className='todo'>
      
        <div className={isChecked ? 'title checked' : 'title'} onClick={checkToDo}>{title}</div>
        
        <Popup trigger={<button className="trigger"> learn more </button>} position="top center">
            <span>{description}
            <br/>
            <br/>
            {'/ due date :'+date}
            </span>
            <br/>
          </Popup>
        <div className='icons'>
            <CiEdit className="icon" onClick={changeToUpdateMode}/>
            <MdDeleteForever className="icon" onClick={deleteToDo}/>
        </div>
        
     </div>
  )
}

export default ToDo