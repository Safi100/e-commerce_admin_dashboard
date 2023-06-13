import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login'
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
              <Routes>
                <Route path='/login' element={<Login/>} />
                <Route element={[<Navbar />, <Sidebar />]}>
                    <Route exact path='/' element={<IndexPage/>} />
                </Route>
                  {/* <Route path='*' element={<NotFound/>} /> */}
              </Routes>
    );
}

export default App;
