import axios from 'axios'
import { useState } from 'react'
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
      
    }).catch((err)=>console.log(err))

}

export const useSignUp = () => {
    const [errorSignUp,setErrorSignUp] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
  
    const signUp = async (email) =>{
        setIsLoading(true)
        setErrorSignUp(null)
        await axios.post(baseUrl+"/signUp",{email}).then((data)=>{
        
            localStorage.setItem('user', JSON.stringify(data.data))
            
            dispatch({type:'LOGIN', payload : data.data})
            setIsLoading(false)
        }).catch(async(err)=>{
            if(err.response.status){
                setIsLoading(false)
                await setErrorSignUp(err.response.data)
            } 
           console.log(errorSignUp);
        })

        
    }
    return {signUp,errorSignUp,isLoading}

}

export const useLogin = () => {
    const [errorLogin,setErrorLogin] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email) =>{
       
        await axios.post(baseUrl+"/login",{email}).then((data)=>{
      
            localStorage.setItem('user', JSON.stringify(data.data))
    
            dispatch({type:'LOGIN', payload : data.data})
        }).catch(async(err)=>{
            if(err.response.status){
               await setErrorLogin(err.response.data)
            } 
           
        })

        
    }
    return {login,errorLogin}

}

export const useLogout = () => {

    const {dispatch} = useAuthContext()
  
    const logout = async (email) =>{
        localStorage.removeItem('user')
    
        dispatch({type:'LOGOUT'})

        
    }
    return {logout}

}

export {getAllToDo, addToDo, updateToDo,deleteToDo,checkToDo}