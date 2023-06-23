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
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

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
        setError('')
        setSuccess('')
        if(images.length > 4){
            setError('You can upload max 4 photos.')
            return;
        }
        images.forEach(img => {
            const type = img.type.split('/')[0]
            if(type !== "image"){
                setError('You can only upload images.')
            }
        })
        let formData = new FormData();
        formData.append('title', title)
        formData.append('price', price)
        formData.append('discount', discount)
        formData.append('category', Category)
        formData.append('brand', Brand)
        formData.append('description', description)
        formData.append('chose_for_you', chose_for_you)
        formData.append('still_available', still_available)
        images.forEach((image) => {
            formData.append(`img`, image);
        });
        Axios.post('http://localhost:8000/products', formData)
        .then(success => {
            if(success.status == 200){
                setSuccess('Product added successfully')
                e.target.reset();
            }
        })
        .catch(err => console.log(err))
    }
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
                    <input className="input-box" onChange={handleTitleChange} name='product_title' type="text" placeholder="Enter product name" required />
                </div>
                <div className="input">
                    <span className="details">Price</span>
                    <input className="input-box" onChange={handlePriceChange} name='product_price' type="number" placeholder="Enter price" required />
                </div>
                <div className="input">
                    <span className="details">Discount</span>
                    <input className="input-box" onChange={handleDiscountChange} name='product_discount' type="number" placeholder="Enter discount (default is 0)" />
                </div>
                <div className="input">
                    <label className="details">Images</label>
                    <input className="form-control input-box" accept="image/*" onChange={handleImagesChange} name="product_images" type="file" id="formFileMultiple" multiple/>
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
                            <MenuItem key={category._id} value={`${category._id}`}>{category.CategoryName}</MenuItem>
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
                            <MenuItem key={brand._id} value={`${brand._id}`}>{brand.BrandName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='description'>
                    <label className="details">Description</label>
                    <textarea className='input-box textarea'onChange={handleDescriptionChange} name="product_description" cols="30" rows="4" required></textarea>
                </div>
            </div>
            <div className="choose-details">
                <span className="choose-title">Still available (default is yes)</span>
                <div className="choose">
                    <label htmlFor="yes">
                        <input type="radio" onChange={handleStill_availableChange} value={true} name="still_available" id="yes"/>
                        <span id="yes">yes</span>
                    </label>
                    <label htmlFor="no">
                        <input type="radio" onChange={handleStill_availableChange} value={false} name="still_available" id="no"/>
                        <span id='no'>no</span>
                    </label>
                </div>
            </div>
            <div className="choose-details">
                <span className="choose-title">Chosen for you (default is no)</span>
                <div className="choose">
                    <label htmlFor="yes2">
                            <input type="radio" onChange={handleChose_for_youChange} value={true} name="chose_for_you" id="yes2"/>
                            <span id="yes2">yes</span>
                    </label>
                        <label htmlFor="no2">
                            <input type="radio" onChange={handleChose_for_youChange} value={false} name="chose_for_you" id="no2"/>
                            <span  id='no2'>no</span>
                        </label>
                </div>
            </div>
                    {success && <p className='text-success fw-bold'>{success}</p>}
                <div className="button">
                    {error && <p className='text-danger fw-bold'>{error}</p>}
                    <input type="submit" value="Add Product" />
                </div>
        </form>
    </div>
        </div>
    );
}

export default NewProduct;