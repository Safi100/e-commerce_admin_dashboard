import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import NoImage from '../../assets/image-placeholder.png'
import './products.css'
const Products = () => {
    const [Products, setProducts] = useState([])
        useEffect(()=> {
            Axios.get('http://localhost:8000/products')
            .then(res => {setProducts(res.data)})
            .catch(err => console.log(err))
        }, [])
    return (
        <div className='row gap-3'>
            {console.log(Products)}
            {Products.map(product => (
                <div className="card" key={product._id}>
                    <img className='product_image' src={(!product.images.length > 0) ? NoImage : ""} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text product_description">{product.description}</p>
                        <a href={`/products/${product._id}`} className="btn btn-primary">Product page</a>
                    </div>
                </div>
            ))}
            
        </div>
    );
}

export default Products;
