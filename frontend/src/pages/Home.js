import {  useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import ToDo from "../components/ToDoComponent";
import { useAuthContext } from '../hooks/useAuthContext'
import { getAllToDo, addToDo, updateToDo, deleteToDo,checkToDo,useLogout } from "../utils/handleApi";

import './Home.css'

export default function Home() {

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
      title:"",
      description:"",
      date:""
    
    })
    const [isUpdating,setIsUpdating] = useState(false)
    const [toDoId,setToDoId] = useState("") 
  
    
  
    useEffect(() => { if(user) getAllToDo(setToDo,user.token)}, [user])
    
   
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
        <h1>ToDo App</h1> <button onClick={logoutSubmit}>Logout</button> 
      
      <div className="container">
      <div className="todo-list">
        <h3>ToDo List</h3>
        
        {
          toDo.map((item) => 
          
          <ToDo 
              key={item._id} 
              title={item.title} 
              isChecked={item.checked}
              checkToDo={() => checkToDo(item._id,!item.checked,setToDo)}
              changeToUpdate={() => changeToUpdate(item._id,item.title,item.description,item.date)} 
              deleteToDo ={ () => deleteToDo(item._id,setToDo)}
              />)}
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
          
          <input type="text" placeholder="due date" 
                 value={toDoInfo.date} 
                 onChange={(e) => {setToDoInfo({...toDoInfo,date : e.target.value})}}
                 />
          
          <button onClick={
                  isUpdating ? () => updateToDo(toDoId,toDoInfo.title,toDoInfo.description,toDoInfo.date,setToDoInfo,setToDo,setIsUpdating)
                             : () => addToDo(toDoInfo.title,toDoInfo.description,toDoInfo.date,setToDoInfo,setToDo)}>
                              {isUpdating ? "update" : "add"}
                              </button>
        </div>
      </div>
    </div>
  )
}
