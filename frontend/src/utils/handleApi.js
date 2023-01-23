import axios from 'axios'

const baseUrl = "http://localhost:5000"

const getAllToDo = (setToDo) => {
    axios.get(baseUrl).then((data) => {
        setToDo(data.data)
    })
}

const addToDo = (title,description,date,setToDoInfo,setToDo) => {
    axios.post(baseUrl+"/createToDo",{title,description,date}).then(()=>{
        setToDoInfo({})
        getAllToDo(setToDo)

    })

}

const updateToDo = (toDoId,title,description,date,setToDoInfo,setToDo,setIsUpdating) => {
    axios.post(baseUrl+"/updateToDo",{_id:toDoId,title,description,date}).then(()=>{
        setToDoInfo({})
        setIsUpdating(false)
        getAllToDo(setToDo)

    }).catch((err)=>console.log(err))

}

const deleteToDo = (toDoId,setToDo) => {
    axios.post(baseUrl+"/deleteToDo",{_id :toDoId}).then(()=>{
        getAllToDo(setToDo)
    }).catch((err)=>console.log(err))

}

const checkToDo = (toDoId,checked,setToDo) => {
    axios.post(baseUrl+"/checkToDo",{_id :toDoId,checked}).then(()=>{
        getAllToDo(setToDo)
        // setIsChecked(true)
    }).catch((err)=>console.log(err))

}

export {getAllToDo, addToDo, updateToDo,deleteToDo,checkToDo}