import {  useEffect, useState } from "react";
import ToDo from "./components/ToDoComponent";
import { getAllToDo, addToDo, updateToDo, deleteToDo } from "./utils/handleApi";


function App() {

  const [toDo,setToDo] = useState([])
  const [toDoInfo,setToDoInfo] = useState({
    title:"",
    description:"",
    date:""
  
  })
  const [isUpdating,setIsUpdating] = useState(false)
  const [toDoId,setToDoId] = useState("") 
  

  useEffect(() => {getAllToDo(setToDo)}, [])
  
 
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
    <div className="App">
      <h1>ToDo App</h1>
      
      <div className="container">
      <div className="todo-list">
        <h3>ToDo List</h3>
        
        {
          toDo.map((item) => 
          <ToDo 
              key={item._id} 
              title={item.title} 
              changeToUpdate={() => changeToUpdate(item._id,item.title,item.description,item.date)} 
              deleteToDo ={ () => deleteToDo(item._id,setToDo)}/>)}
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
  );
}

export default App;
