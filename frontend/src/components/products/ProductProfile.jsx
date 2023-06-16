import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import './test.css'
const ProductProfile = () => {
    const { id } = useParams()
    const [Product, setProduct] = useState([])
    useEffect(()=> {
        Axios.get(`http://localhost:8000/products/${id}`)
        .then(res => {setProduct(res.data)})
        .catch(err => console.log(err))
    }, [])
    return (
        <div className="wrapper">
            <div className="cont">
        <div className="title">Add Product</div>
        <form action="">
            <div className="inputs">
                <div className="input">
                    <span className="details">Title</span>
                    <input className="input-box" name='product_title' type="text" placeholder="Enter product name" required />
                </div>
                <div className="input">
                    <span className="details">Price</span>
                    <input className="input-box" name='product_price' type="number" placeholder="Enter your uername" required />
                </div>
                <div className="input">
                    <span className="details">Discount</span>
                    <input className="input-box" name='product_discount' type="number" placeholder="Enter discount (default is 0)" />
                </div>
                <div className="input">
                    <span className="details">Phone number</span>
                    <input className="input-box" type="file" placeholder="Enter your number" required />
                </div>
                <div className="input">
                    <span className="details">Password</span>
                    <input className="input-box" type="password" placeholder="Enter your password" required />
                </div>
                <div className="input">
                    <span className="details">Confirm Password</span>
                    <input className="input-box" type="password" placeholder="Confirm your password" required />
                </div>
            </div>
            <div className="Gender-details">
                <span className="Gender-title">Still available</span>
                <div className="choose">
                    <label for="yes">
                        <input type="radio" name="still_available" id="yes" />
                        <span className="gender" id="yes">yes</span>
                    </label>
                    <label for="no">
                        <input type="radio" name="still_available" id="no" />
                        <span className="gender" id='no'>no</span>
                    </label>
                </div>
            </div>
            <div className="Gender-details">
                <span className="Gender-title">Chosen for you</span>
                <div className="choose">
                    <label for="male">
                        <input type="radio" name="Gender" id="male" />
                        <span className="gender">Male</span>
                    </label>
                    <label for="female">
                        <input type="radio" name="Gender" id="female" />
                        <span className="gender" id="female">Female</span>
                    </label>
                    <label for="prefer-not-to-say">
                        <input type="radio" name="Gender" id="prefer-not-to-say" />
                        <span className="gender" id="prefer-not-to-say">Prefer not to say</span>
                    </label>
                </div>
            </div>
                <div className="button">
                    <input type="submit" value="Add Product" />
                </div>
        </form>
    </div>
        </div>
    );
}

export default ProductProfile;
