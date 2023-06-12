import React, { useEffect, useState } from 'react';
import './login.css'
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [PasswordError, setPasswordError] = useState(false)
    
    const HandleUserNameChange = (e) => {
        const text = e.target.value.trimStart() 
        setUsername(text)
    }
    const HandlePasswordChange = (e) => {
        const text = e.target.value.trimStart()
        setPassword(text)
    }
    const handlerSubmit = (e) => {
        e.preventDefault()
        setUsernameError((username === "") ? true : false)
        setPasswordError((password === "") ? true : false)
        if(username !== "" && password !== ""){
            const user = {username, password}
            console.log(user);
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
                </form>
            </div>
        </div>
    );
}
export default Login;
