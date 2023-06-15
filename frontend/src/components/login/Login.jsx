import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import Axios from 'axios'
import './login.css'
const Login = () => {
    ReactSession.setStoreType("localStorage");
    const Navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [PasswordError, setPasswordError] = useState(false)
    const [wrong, setWrong] = useState(false)
    
    const HandleUserNameChange = (e) => {
        const text = e.target.value.trimStart() 
        setUsername(text)
    }
    const HandlePasswordChange = (e) => {
        const text = e.target.value.trimStart()
        setPassword(text)
    }
    const handlerSubmit = async (e) => {
        e.preventDefault()
        setUsernameError((username === "") ? true : false)
        setPasswordError((password === "") ? true : false)
        if(username !== "" && password !== ""){
            const user = {username, password}
            // todo : post method to localhost:3000/login
            try{
                await Axios.post('http://localhost:8000/login', {username, password})
                .then(async res => {
                    setWrong((res.data !== "match") ? true : false)
                    if(res.data){
                        ReactSession.set("username", res.data);
                        Navigate('/')
                    }else{
                        setWrong("Wrong username/password")
                    }
                })
            }catch(err){
                setWrong(err)
            }
        }
    }

    return (
        <div className='body_login'>
            <div className="container">
                <h2>Admin Login</h2>
                <form id="loginForm" method="POST" onSubmit={handlerSubmit}>
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={HandleUserNameChange} type="text" name="username" placeholder="Enter your username"></input>
                    {usernameError && <p className="errorMessage">Please enter a username.</p>}
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={HandlePasswordChange} type="password" name="password" placeholder="Enter your password"></input>
                    {PasswordError && <p className="errorMessage">Please enter a password.</p>}
                    <button type="submit">Login</button>
                    {wrong && <p className='errorMessage'>{wrong.message}</p>}
                </form>
            </div>
        </div>
    );
}
export default Login;
