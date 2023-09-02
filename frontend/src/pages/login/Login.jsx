import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import Axios from 'axios'
import './login.css'
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const {user} = useContext(AuthContext)
    const Navigate = useNavigate()

    useEffect( ()=> {
        if(user) Navigate('/')
    }, [user, Navigate])

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
    const {loading, error, dispatch} = useContext(AuthContext)

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        setUsernameError((username === "") ? true : false)
        setPasswordError((password === "") ? true : false)
        if(username !== "" && password !== ""){
            Axios.post('http://localhost:8000/login', {username, password})
            .then(res => {
                if(res.status === 200){
                    dispatch({type: "LOGIN_SUCCESS", payload: res.data})
                    Navigate('/')
                }else{
                    throw new Error('Something went wrong ...');
                 }
            })
            .catch(err => {
                (err.response.data.message === 'Username/password wrong') ? setWrong(err.response.data.message) : console.log(err)
                dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
            })
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
                    <button disabled={loading} type="submit">Login</button>
                    {wrong && <p className='errorMessage fs-6 mt-2'>{wrong}</p>}
                </form>
            </div>
        </div>
    );
}
export default Login;
