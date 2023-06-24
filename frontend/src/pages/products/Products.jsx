import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import NoImage from '../../assets/image-placeholder.png'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './products.css'
const Products = () => {
    const [Products, setProducts] = useState([])
    const [filterByCategory, setFilterByCategory] = useState('')
    const [orderBy, setorderBy] = useState('');
    const [categories, setCategories] = useState([])
    const handleOrderByChange = (event) => {
        setorderBy(event.target.value);
      };
    const handleFilterByCategoryChange = (event) => {
      setFilterByCategory(event.target.value);
      };
    useEffect(()=> {
        Axios.get(`http://localhost:8000/products?orderBy=${orderBy}&category=${filterByCategory}`)
        .then(res => {setProducts(res.data)})
        .catch(err => console.log(err))
    }, [filterByCategory, orderBy])
    return (
        <div className='p-3'>
        <FormControl sx={{ mb: 2, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={orderBy}
                  onChange={handleOrderByChange}
                  autoWidth
                  label=">Sort by"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value={"price_low"}>Price: Low to High</MenuItem>
                  <MenuItem value={"price_high"}>Price: High to Low</MenuItem>
                  <MenuItem value={'avg_rating'}>Average rating</MenuItem>
                </Select>
            </FormControl>
        <div className=''>
            {console.log(Products)}
            {Products.map(product => (
                <div className="product mb-4" key={product._id}>
                    <div className='img_container'>
                        <img className='product_image' src={(product.images.length > 0) ? product.images[0].url : NoImage} alt="" />
                    </div>
                    <div className="product_body">
                        <h5 className="product_title">{product.title}</h5>
                        <p>stars, {product.reviews.length}</p>
                        <p className='price'>
                            <span><sup className='sign'>$</sup>{product.priceToPay}</span>
                            {(product.price !== product.priceToPay ) ? <span className='priceBefore text-secondary'>${product.price}</span> : ""}
                        </p>
                        <p className={(product.discount > 0) ? "text-danger" : "text-secondary"}>{(product.discount > 0) ? `Discount is %${product.discount}` : "No discount"}</p>
                        {/* <p className="card-text mb_2 product_description">{product.description}</p> */}
                        <a href={`/products/${product._id}`} className="btn btn-primary mt-2">Product page</a>
                    </div>
                </div>
            ))}
            
        </div>
        </div>
    );
}

export default Products;
