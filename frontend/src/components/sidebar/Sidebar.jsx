import React from 'react';
import './sidebar.css'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="control_div"></div>
            {/* <h3 className="welcome_message">Welcome back <%= currentUser %></h3> */}
            <div className="list_items">
                <ul className="list">
                    <p className="list_heading">Dashboard</p>
                    <li><a href="/"> Home</a></li>
                </ul>
                <ul className="list">
                    <p className="list_heading">Quick Menu</p>
                    <li><a href=""> Customers</a></li>
                    <li><a href=""> Products</a></li>
                    <li><a href=""> Orders</a></li>
                </ul>
                <ul className="list">
                    <p className="list_heading">Notifications</p>
                    <li><a href=""> Reviews</a></li>
                    <li><a href=""> Messages</a></li>
                    <li><a href=""> Complaint</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
