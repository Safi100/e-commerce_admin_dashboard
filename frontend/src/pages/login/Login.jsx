import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Axios from 'axios'
import './login.css'

const Login = () => {
    const authContext = useContext(AuthContext)
    const Navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const HandleEmailChange = (e) => {
        const text = e.target.value.trimStart() 
        setEmail(text)
    }
    const HandlePasswordChange = (e) => {
        const text = e.target.value.trimStart()
        setPassword(text)
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        authContext.login(email, password)
        if(authContext.success){
            Navigate('/')
        }
    }

    return (
        <div className='body_login'>
            <div className="container">
                <h2>Admin Login</h2>
                <form id="loginForm" method="POST" onSubmit={handlerSubmit}>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={HandleEmailChange} type="text" name="email" placeholder="Enter your email" required></input>
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={HandlePasswordChange} type="password" name="password" placeholder="Enter your password" required></input>
                    <button type="submit">Login</button>
                    {authContext.error && <p className='errorMessage fs-6 mt-2'>{authContext.error}</p>}
                </form>
            </div>
        </div>
    );
}
export default Login;
