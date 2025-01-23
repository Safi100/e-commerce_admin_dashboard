import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
// pages
import Login from './pages/login/Login';
import CustomersPage from './pages/customersPage/CustomersPage';
import IndexPage from './pages/indexPage/IndexPage';
import Products from './pages/products/Products';
import ProductProfile from './pages/products/ProductProfile';
import NewProduct from './pages/newProductPage/NewProduct';
import Reviews from './pages/review/Reviews';
import Brand from './pages/Brand/Brand';
import EditProduct from './pages/editProduct/EditProduct';
import Category from './pages/Category/Category';
import Advertisement from './pages/advertisement/Advertisement';
import ForgetPass from './pages/forget_pass/Forget_pass';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Orders from './pages/order/Order';
import CustomerProfile from './pages/customerProfile/CustomerProfile';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import Loading from './assets/loading.gif';

axios.defaults.withCredentials = true;

const App = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const locations = ['/login', '/forget-password', '/reset-password']
    const CurrentUser = async () => {
        const status = await auth.fetchCurrentUser();

        const currentPath = window.location.pathname;
        const isAllowedPath = locations.some(location => currentPath.startsWith(location));
        
        if (!isAllowedPath && status !== 200) {
            navigate('/login');
        }
    };

    useEffect(() => {
        CurrentUser();
    }, []);
    
    return (
        <>
        {auth.Loading_currentUser ? 
        <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '100vh' }}>
            <img src={Loading} alt='loading' /> 
        </div>
        :
        <>
        {
            !window.location.pathname.startsWith('/login') &&
            !window.location.pathname.startsWith('/forget-password') &&
            !window.location.pathname.startsWith('/reset-password') &&
            <Sidebar />
        }
        <Routes>
            <Route exact path='/' element={<IndexPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/customers' element={<CustomersPage />} />
            <Route path='/products' element={<Products />} />
            <Route path='/reviews' element={<Reviews />} />
            <Route path='/brand' element={<Brand />} />
            <Route path='/forget-password' element={<ForgetPass/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/category' element={<Category />} />
            <Route path='/advertisement' element={<Advertisement />} />
            <Route path='/products/new' element={<NewProduct />} />
            <Route path='/customer/:id' element={<CustomerProfile />} />
            <Route path='/products/:id' element={<ProductProfile />} />
            <Route path='/products/:id/edit' element={<EditProduct />} />
            <Route path='/reset-password/:UserID/:token' element={<ResetPassword/>} />
            {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
        </>
        }
        </>
    );
};

export default App;
