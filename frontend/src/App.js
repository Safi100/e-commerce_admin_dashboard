import React, { useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login'
import CustomersPage from './components/customersPage/CustomersPage'
import IndexPage from './components/indexPage/IndexPage'
import { ReactSession } from 'react-client-session';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
const App = () => {
    const Navigate = useNavigate()
    ReactSession.setStoreType("localStorage");
    useEffect(()=>{
        const username = ReactSession.get("username");
        if(!username){
            return Navigate('/login')
        }
    },[])
    return (
        <>
            {window.location.pathname !== '/login' && <Sidebar />}
              <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/customers' element={<CustomersPage/>} />
                <Route exact path='/' element={<IndexPage/>} />
                  {/* <Route path='*' element={<NotFound/>} /> */}
              </Routes>
        </>
    );
}

export default App;
