import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './newProduct.css'

const NewProduct = () => {
    const [Categories, setCategories] = useState([])
    const [Brands, setBrands] = useState([])
    
    const [Brand, setBrand] = useState([])
    const [Category, setCategory] = useState('');  

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };
    useEffect(()=> {
        Axios.get(`http://localhost:8000/category`)
        .then(res => {setCategories(res.data)})
        .catch(err => console.log(err))

        Axios.get(`http://localhost:8000/brand`)
        .then(res => {setBrands(res.data)})
        .catch(err => console.log(err))

    }, [])
    return (
        <div className="wrapper">
            <div className="cont">
        <div className="title">Add Product</div>
        <form encType="multipart/form-data">
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
                    <label className="details">Images</label>
                    <input className="form-control input-box" name="image" type="file" id="formFileMultiple" required multiple />
                </div>
                <div className="input">
                    <label className="details">Category</label>
                    <FormControl required style={{width:"100%"}} sx={{ maxWidth:300 }}>
                        <Select
                        className='input-box'
                        style={{height:"45px", padding:"0"}}
                          id="demo-simple-select-required"
                          value={Category}
                          onChange={handleCategoryChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {Categories.map((category) => (
                            <MenuItem key={category._id} value={`${category.CategoryName}`}>{category.CategoryName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="input">
                    <label className="details">Brand</label>
                    <FormControl required style={{width:"100%"}} sx={{ maxWidth:300 }}>
                        <Select
                        className='input-box'
                        style={{height:"45px", padding:"0"}}
                          id="demo-simple-select-required"
                          value={Brand}
                          onChange={handleBrandChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {Brands.map((brand) => (
                            <MenuItem key={brand._id} value={`${brand.BrandName}`}>{brand.BrandName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='description'>
                    <label className="details">Description</label>
                    <textarea name="product_description" id="" cols="30" rows="4"></textarea>
                </div>
            </div>
            <div className="Gender-details">
                <span className="Gender-title">Still available (default is yes)</span>
                <div className="choose">
                    <label htmlFor="yes">
                        <input type="radio" name="still_available" id="yes"/>
                        <span className="gender" id="yes">yes</span>
                    </label>
                    <label htmlFor="no">
                        <input type="radio" name="still_available" id="no"/>
                        <span className="gender" id='no'>no</span>
                    </label>
                </div>
            </div>
            <div className="Gender-details">
                <span className="Gender-title">Chosen for you (default is no)</span>
                <div className="choose">
                    <label htmlFor="male">
                        <input type="radio" name="Gender" id="male" />
                        <span className="gender">Male</span>
                    </label>
                    <label htmlFor="female">
                        <input type="radio" name="Gender" id="female" />
                        <span className="gender" id="female">Female</span>
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

export default NewProduct;