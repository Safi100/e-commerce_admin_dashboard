import React, { useContext, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Login from './pages/login/Login'
import CustomersPage from './pages/customersPage/CustomersPage'
import IndexPage from './pages/indexPage/IndexPage'
import Products from './pages/products/Products';
import ProductProfile from './pages/products/ProductProfile';
import NewProduct from './pages/newProductPage/NewProduct'
import Reviews from './pages/review/Reviews';
import Brand from './pages/Brand/Brand';
import EditProduct from './pages/editProduct/EditProduct'
import Category from './pages/Category/Category';
import Advertisement from './pages/advertisement/Advertisement';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import axios from 'axios';

axios.defaults.withCredentials = true;

const App = () => {
    const Navigate = useNavigate()
    // const {currentUser} = useContext(AuthContext)

    // useEffect( ()=> {
    //     if(!currentUser) Navigate('/login')
    // }, [currentUser, Navigate])

    return (
        <>
            {window.location.pathname !== '/login' && <Sidebar />}
            <Routes>
                <Route exact path='/' element={<IndexPage/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/customers' element={<CustomersPage/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/reviews' element={<Reviews/>} />
                <Route path='/brand' element={<Brand/>} />
                <Route path='/category' element={<Category/>} />
                <Route path='/advertisement' element={<Advertisement/>} />
                <Route path='/products/new' element={<NewProduct/>} />
                <Route path='/products/:id' element={<ProductProfile/>} />
                <Route path='/products/:id/edit' element={<EditProduct/>} />
                  {/* <Route path='*' element={<NotFound/>} /> */}
            </Routes>
        </>
    );
}

export default App;
