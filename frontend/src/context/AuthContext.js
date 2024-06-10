import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext([])

export function AuthContextProvider({ children }) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  
  const fetchCurrentUser = () => {
    if (!Cookies.get('c_user')) return;
    axios.get('http://localhost:8000/auth/currentUser')
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch((e) => {
        console.log(e)
      });
  }

  const login = (email, password) => {
    setError('')
    setSuccess(false);
    axios.post('http://localhost:8000/auth/login', { email, password })
    .then((res) => {
      fetchCurrentUser()
      setSuccess(true)
      setCurrentUser(res.data)
    })
    .catch((err) => {
      setError(err.response.data.error)
      console.log(err)
    })
  }
  const logout = () => {
    axios.post('http://localhost:8000/auth/logout')
    .then(() => setCurrentUser(null))
    .catch((err) => console.log(err))
  }

  return (
    <AuthContext.Provider value={{ login, logout, error, currentUser, success }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
