import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext([])

export function AuthContextProvider({ children }) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [Loading_currentUser, setLoading_currentUser] = useState(true)

  const fetchCurrentUser = async () => {
    if (!Cookies.get('c_user')) {
      setLoading_currentUser(false)
      return 401;
    }
    return axios.get('http://localhost:8000/auth/currentUser')
      .then((res) => {
        setCurrentUser(res.data)
        setLoading_currentUser(false)
        return res.status;
      })
      .catch((e) => {
        setLoading_currentUser(false)
        return 500;
      });
  }

  const login = async (email, password) => {
    setError('')
    setSuccess(false);
    return axios.post('http://localhost:8000/auth/login', { email, password })
    .then((res) => {
      fetchCurrentUser()
      setSuccess(true)
      return res.status;
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
    <AuthContext.Provider value={{ login, logout, error, currentUser, success, Loading_currentUser, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
