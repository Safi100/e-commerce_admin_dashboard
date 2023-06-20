import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './newProduct.css'

const NewProduct = () => {
    const [Categories, setCategories] = useState([])
    const [Brands, setBrands] = useState([])

    
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [images, setImages] = useState([])
    const [Category, setCategory] = useState('');  
    const [Brand, setBrand] = useState([])
    const [description, setDescription] = useState('')
    const [still_available, setStill_available] = useState(true)
    const [chose_for_you, setChose_for_you] = useState(false)


    const handleTitleChange = (e) => {
        const text = e.target.value.trimStart() 
        setTitle(text);
    };
    const handlePriceChange = (e) => {
        const text = e.target.value.trimStart() 
        setPrice(text);
    };
    const handleDiscountChange = (e) => {
        const text = e.target.value.trimStart() 
        setDiscount(text);
    };
    const handleImagesChange = (e) => {
        setImages([...e.target.files])
        // console.log(e.target.files[0])
    }
    const handleDescriptionChange = (e) => {
        const text = e.target.value.trimStart() 
        setDescription(text);
    };
    const handleStill_availableChange = (e) => {
        const text = e.target.value.trimStart() 
        setStill_available(text);
    };
    const handleChose_for_youChange = (e) => {
        const text = e.target.value.trimStart() 
        setChose_for_you(text);
    };
    const handleBrandChange = (e) => {
        setBrand(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:8000/test', {images})
    } 
    useEffect(()=> {
        images.map((img) => (
            console.log(img)
        ))
        // console.log(images[2])
    }, [images])
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="inputs">
                <div className="input">
                    <span className="details">Title</span>
                    <input className="input-box" value={title} onChange={handleTitleChange} name='product_title' type="text" placeholder="Enter product name" required />
                </div>
                <div className="input">
                    <span className="details">Price</span>
                    <input className="input-box" value={price} onChange={handlePriceChange} name='product_price' type="number" placeholder="Enter your uername" required />
                </div>
                <div className="input">
                    <span className="details">Discount</span>
                    <input className="input-box" value={discount} onChange={handleDiscountChange} name='product_discount' type="number" placeholder="Enter discount (default is 0)" />
                </div>
                <div className="input">
                    <label className="details">Images</label>
                    <input className="form-control input-box" onChange={handleImagesChange} name="product_images" type="file" id="formFileMultiple" required multiple />
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
                    <textarea name="product_description" cols="30" rows="4"></textarea>
                </div>
            </div>
            <div className="Gender-details">
                <span className="Gender-title">Still available (default is yes)</span>
                <div className="choose">
                    <label htmlFor="yes">
                        <input type="radio" value={true} name="still_available" id="yes"/>
                        <span className="gender" id="yes">yes</span>
                    </label>
                    <label htmlFor="no">
                        <input type="radio" value={false} name="still_available" id="no"/>
                        <span className="gender" id='no'>no</span>
                    </label>
                </div>
            </div>
            <div className="Gender-details">
                <span className="Gender-title">Chosen for you (default is no)</span>
                <div className="choose">
                    <label htmlFor="yes">
                            <input type="radio" value={true} name="chose_for_you" id="yes"/>
                            <span className="gender" id="yes">yes</span>
                        </label>
                        <label htmlFor="no">
                            <input type="radio" value={false} name="chose_for_you" id="no"/>
                            <span className="gender" id='no'>no</span>
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