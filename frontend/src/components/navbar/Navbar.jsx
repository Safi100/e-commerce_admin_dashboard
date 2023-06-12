import React from 'react';
import './navbar.css'
const Navbar = () => {
    return (
        <nav>
            <div className="wrapper">
                <h1 className="logo"><a href="/">E-admin</a></h1>
                <div className="account"><a className="logout" href="/logout">Logout</a></div>
            </div>
        </nav>
    );
}

export default Navbar;
