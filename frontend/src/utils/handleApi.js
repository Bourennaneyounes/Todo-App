import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

const baseUrl = "http://localhost:5000"

const getAllToDo = (owner,setToDo,token) => {
    axios.interceptors.request.use(req => {
        req.headers.authorization = token;
        
        return req;
      });
      
    
    axios.get(baseUrl+'/'+owner).then((data) => {
        setToDo(data.data)
    })
}

const addToDo = (owner,title,description,date,setToDoInfo,setToDo) => {
    // console.log(owner);
    axios.post(baseUrl+"/createToDo",{owner,title,description,date}).then(()=>{
        setToDoInfo({})
        getAllToDo(owner,setToDo)

    })

}

const updateToDo = (owner,toDoId,title,description,date,setToDoInfo,setToDo,setIsUpdating) => {
    
    axios.post(baseUrl+"/updateToDo",{_id:toDoId,title,description,date}).then(()=>{
        
        setToDoInfo({})
        
        setIsUpdating(false)
        getAllToDo(owner,setToDo)
        
    }).catch((err)=>console.log(err))

}

const deleteToDo = (owner,toDoId,setToDo) => {
    axios.post(baseUrl+"/deleteToDo",{_id :toDoId}).then(()=>{
        getAllToDo(owner,setToDo)
    }).catch((err)=>console.log(err))

}

const checkToDo = (owner,toDoId,checked,setToDo) => {
    axios.post(baseUrl+"/checkToDo",{_id :toDoId,checked}).then(()=>{
        getAllToDo(owner,setToDo)
        // setIsChecked(true)
    }).catch((err)=>console.log(err))

}

export const useSignUp = () => {

    const {dispatch} = useAuthContext()
    // console.log(dispatch)
    const signUp = async (email) =>{
        await axios.post(baseUrl+"/signUp",{email}).then((data)=>{
            // getAllToDo(setToDo)
            // setIsChecked(true)
            // console.log(data.data);
            localStorage.setItem('user', JSON.stringify(data.data))
    
            dispatch({type:'LOGIN', payload : data.data})
        }).catch((err)=>console.log(err))

        
    }
    return {signUp}

}

export const useLogin = () => {

    const {dispatch} = useAuthContext()
    // console.log(dispatch)
    const login = async (email) =>{
        // console.log(token)
        await axios.post(baseUrl+"/login",{email}).then((data)=>{
            // getAllToDo(setToDo)
            // setIsChecked(true)
            // console.log(data.data);
            localStorage.setItem('user', JSON.stringify(data.data))
    
            dispatch({type:'LOGIN', payload : data.data})
        }).catch((err)=>console.log(err))

        
    }
    return {login}

}

export const useLogout = () => {

    const {dispatch} = useAuthContext()
    // console.log(dispatch)
    const logout = async (email) =>{
        localStorage.removeItem('user')
    
        dispatch({type:'LOGOUT'})

        
    }
    return {logout}

}

export {getAllToDo, addToDo, updateToDo,deleteToDo,checkToDo}