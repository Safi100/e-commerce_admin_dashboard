import React from 'react';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login'
import IndexPage from './components/indexPage/IndexPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const App = () => {
    return (
        <Router>
              <Routes>
                <Route path='/login' element={<Login/>} />
                <Route element={[<Navbar />, <Sidebar />]}>
                    <Route exact path='/' element={<IndexPage/>} />
                </Route>
                  {/* <Route path='*' element={<NotFound/>} /> */}
              </Routes>
        </Router>
    );
}

export default App;
