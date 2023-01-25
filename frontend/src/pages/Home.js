import {  useEffect, useState,useRef } from "react";
import { useNavigate } from 'react-router-dom'
import ToDo from "../components/ToDoComponent";
import { useAuthContext } from '../hooks/useAuthContext'
import { getAllToDo, addToDo, updateToDo, deleteToDo,checkToDo,useLogout } from "../utils/handleApi";

import './Home.css'

export default function Home() {

    /////////////////////////////////////////////////
    const dragItem = useRef();
  const dragOverItem = useRef();
//   const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...toDo];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setToDo(copyListItems);
  };
    ////////////////////////////////////////////////
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const {logout} = useLogout()
    const logoutSubmit = async (e) =>{
        e.preventDefault()
        await logout()

        navigate('/')
        // console.log(emailSignUp)
    }
    
    const [toDo,setToDo] = useState([])
    const [toDoInfo,setToDoInfo] = useState({
      owner:"",
      title:"",
      description:"",
      date:""
    
    })
    const [isUpdating,setIsUpdating] = useState(false)
    const [toDoId,setToDoId] = useState("") 
  
    
  
    useEffect(() => { if(user) getAllToDo(user._id,setToDo,user.token)}, [user])
    
   
    const changeToUpdate = (_id,title,description,date) => {
      setIsUpdating(true)
      setToDoId(_id)
      setToDoInfo({
        title: title,
        description: description,
        date: date
      })
    }
  return (
    <div className="Home">
        <h1>ToDo App</h1> 
        <button onClick={logoutSubmit}>Logout</button> 
      
      <div className="container">
      <div className="todo-list">
        <h3>ToDo List</h3>
    <div class="scroll">
    {
    toDo&&
    toDo.map((item, index) => (
      <div 
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
          <ToDo 
              key={item._id} 
              title={item.title}
              description={item.description}
              date = {item.date} 
              isChecked={item.checked}
              checkToDo={() => checkToDo(user._id,item._id,!item.checked,setToDo)}
              changeToUpdateMode={() => changeToUpdate(item._id,item.title,item.description,item.date)} 
              deleteToDo ={ () => deleteToDo(user._id,item._id,setToDo)}
              
              />
      </div>
      ))}
    </div>
        
        {/* {
          toDo.map((item) => 
          <div className="draggable" draggable>
              <ToDo 
              key={item._id} 
              title={item.title}
              description={item.description}
              date = {item.date} 
              isChecked={item.checked}
              checkToDo={() => checkToDo(user._id,item._id,!item.checked,setToDo)}
              changeToUpdateMode={() => changeToUpdate(item._id,item.title,item.description,item.date)} 
              deleteToDo ={ () => deleteToDo(user._id,item._id,setToDo)}
              
              />
          </div>
          )} */}
        </div>
        <div className="add-todo">
          <input type="text" placeholder="title" 
                 value={toDoInfo.title} 
                 onChange={(e) => {setToDoInfo({...toDoInfo,title : e.target.value})}}
                />

          <textarea rows="5" cols="25" placeholder="description" 
                    value={toDoInfo.description} 
                    onChange={(e) => {setToDoInfo({...toDoInfo,description : e.target.value})}}
                    />
          
          <input type="date" placeholder="due date" 
                 value={toDoInfo.date} 
                 onChange={(e) => {setToDoInfo({...toDoInfo,date : e.target.value})}}
                 />
          
          <button onClick={
                  isUpdating ? () => updateToDo(user._id,toDoId,toDoInfo.title,toDoInfo.description,toDoInfo.date,setToDoInfo,setToDo,setIsUpdating)
                             : () => addToDo(user._id,toDoInfo.title,toDoInfo.description,toDoInfo.date,setToDoInfo,setToDo)}>
                              {isUpdating ? "update" : "add"}
                              </button>
            {isUpdating && (
                <button onClick={() => setIsUpdating(false)}>
                              cancel
                              </button>
            )}
          
        </div>
      </div>
    </div>
  )
}
