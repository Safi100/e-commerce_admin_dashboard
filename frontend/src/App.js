import React, { useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login'
import CustomersPage from './components/customersPage/CustomersPage'
import IndexPage from './components/indexPage/IndexPage'
import Products from './components/products/Products';
import { ReactSession } from 'react-client-session';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import ProductProfile from './components/products/ProductProfile';
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
                <Route exact path='/' element={<IndexPage/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/customers' element={<CustomersPage/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/products/:id' element={<ProductProfile/>} />
                  {/* <Route path='*' element={<NotFound/>} /> */}
              </Routes>
        </>
    );
}

export default App;
