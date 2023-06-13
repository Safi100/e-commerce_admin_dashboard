import React from 'react';
import './sidebar.css'
import { ReactSession } from 'react-client-session';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
const Sidebar = () => {
    ReactSession.setStoreType("localStorage");
    const username = ReactSession.get("username");
    return (
        <div className="sidebar">
            <div className="control_div"></div>
            <h3 className="welcome_message">Welcome back {username}</h3>
            <div className="list_items">
                <ul className="list">
                    <p className="list_heading">Dashboard</p>
                    <li><a href="/"><HomeOutlinedIcon /> Home</a></li>
                </ul>
                <ul className="list">
                    <p className="list_heading">Quick Menu</p>
                    <li><a href=""><PersonOutlinedIcon /> Customers</a></li>
                    <li><a href=""><StorefrontOutlinedIcon /> Products</a></li>
                    <li><a href=""><ShoppingBagOutlinedIcon /> Orders</a></li>
                </ul>
                <ul className="list">
                    <p className="list_heading">Notifications</p>
                    <li><a href=""><RateReviewOutlinedIcon /> Reviews</a></li>
                    <li><a href=""><ChatBubbleOutlineOutlinedIcon /> Messages</a></li>
                    <li><a href=""><SentimentDissatisfiedOutlinedIcon /> Complaint</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
