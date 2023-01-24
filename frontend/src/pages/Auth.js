// import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useSignUp,useLogout,useLogin } from '../utils/handleApi'

import './Auth.css'

export default function Auth() {

    const {user} = useAuthContext()
    
    
    const [emailSignUp,setEmailSignUp] = useState("")
    const [emailLogin,setEmailLogin] = useState("")

    const {signUp} = useSignUp()
    const {logout} = useLogout()
    const {login} = useLogin()

    const navigate = useNavigate()

    const signUpSubmit = async (e) =>{
        e.preventDefault()
        await signUp(emailSignUp)

        navigate('/todos')
        // console.log(emailSignUp)
    }

    const logoutSubmit = async (e) =>{
        e.preventDefault()
        await logout()
        navigate('/')
        // console.log(emailSignUp)
    }
    
    const loginSubmit = async (e) =>{
        e.preventDefault()
        // console.log(user.token)
        await login(emailLogin)
        navigate('/todos')
        // console.log(emailLogin)
    }

    
  return (
    <div className='card'>
        {user !==null && (
            <h1>Authentication {user.email}  </h1>
        )}
        {user ===null && (
            <h1>Authentication  </h1>
        )}
        {user===null && (
            <form className='auth' onSubmit={signUpSubmit}>
        
            {/* <label>signup</label> */}
            <input type="email" placeholder="email" value={emailSignUp} onChange={((e)=> setEmailSignUp(e.target.value))} />
            <button className='button'>SignUp</button>
           
            
        </form>
        
        )}
        <div className='line'></div>
        <label className='label'>Already have account ? login</label>
        {user===null && (
            <form className='auth' onSubmit={loginSubmit}>
    
            {/* <label>login</label> */}
            <input type="email" placeholder="email" value={emailLogin} onChange={((e)=> setEmailLogin(e.target.value))} />
            
            <button className='button'>Login</button>
            
            </form>
        
        )}
        {user!==null && (
                <button className='button' onClick={logoutSubmit}>LogOUT</button>
            )}
        {user!==null && (
                <button className='button'  onClick={navigate('/todos')}>Goto Todos</button>
            )}

    
    </div>
    
  )
}
