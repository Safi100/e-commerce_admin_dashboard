import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../newProductPage/newProduct.css'

const EditProduct = () => {
    const { id } = useParams()
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
    const [UploadedImages, setUploadedImages] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [ImageDeletedSuccess, setImageDeletedSuccess] = useState('')
    const [loading, setLoading] = useState(true)
    const [imagesUploadError, setImagesUploadError] = useState('')
    const [responseError, setResponseError] = useState('')
    const handleTitleChange = (e) => {
        const text = e.target.value.trimStart() 
        setTitle(text);
    };
    const handlePriceChange = (e) => {
        const text = e.target.value.trimStart() 
        setPrice(text);
    };
    const handleUploadedImagesChange = (e) => {
        setUploadedImages([...e.target.files])
    };
    const handleDiscountChange = (e) => {
        const text = e.target.value.trimStart() 
        setDiscount(text);
    };
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
        UploadedImages.forEach(img => {
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
        UploadedImages.forEach((image) => {
            formData.append(`img`, image);
        });
        Axios.put(`http://localhost:8000/products/${id}`, formData)
        .then(success => {
            if(success.status == 200){
                setSuccess('Product Updated successfully')
            }
        })
        .catch(err => setResponseError(err))
    }
    const handleDeleteImages = (e) => {
        setImagesUploadError('')
        setImageDeletedSuccess('')
        e.preventDefault()
        if(deleteImages.length === 0){
            setImagesUploadError('Select Images to delete')
        }else{
            setImagesUploadError('')
            Axios.put(`http://localhost:8000/products/${id}/deleteImages`, {images: deleteImages})
            .then(res => {
                setImages(images.filter(img => !deleteImages.includes(img.filename)));
            })
            .catch(err => setImagesUploadError(err))

            setImageDeletedSuccess('Images deleted successfully')
        }
    }
    useEffect(()=> {
        Axios.get(`http://localhost:8000/products/${id}`)
        .then(res => {
            console.log(res.data)
            setTitle(res.data.title)
            setPrice(res.data.price)
            setDiscount(res.data.discount)
            setImages(res.data.images)
            setCategory(res.data.category._id)
            setBrand(res.data.brand._id)
            setDescription(res.data.description)
            setStill_available(res.data.still_available)
            setChose_for_you(res.data.chose_for_you)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setError(err)
        })

        Axios.get(`http://localhost:8000/category`)
        .then(res => {setCategories(res.data)})
        .catch(err => console.log(err))

        Axios.get(`http://localhost:8000/brand`)
        .then(res => {setBrands(res.data)})
        .catch(err => console.log(err))
    }, [success])

    const [deleteImages, setDeleteImages] = useState([])
    const handleCheckedImages = (e) => {
        const Image = e.target.value;
        const isChecked = e.target.checked
        if(isChecked){
            setDeleteImages([...deleteImages, Image])
        }else{
            setDeleteImages(deleteImages.filter(item => item !== Image));
        }
    }
    return (
        <div className="py-3">
        {error && <h3 className='text-danger'>{error.response.data}</h3>}
        {(loading && !error) && <h3>Loading...</h3>}
        {!loading && <>
        <div className='parent d-flex'>
        <div className="cont">
        <div className="title">Update Product</div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="inputs">
                <div className="input">
                    <span className="details">Title</span>
                    <input className="input-box" value={title} onChange={handleTitleChange} name='product_title' type="text" placeholder="Enter product name" required />
                </div>
                <div className="input">
                    <span className="details">Price</span>
                    <input className="input-box" value={price} onChange={handlePriceChange} name='product_price' type="number" placeholder="Enter price" required />
                </div>
                <div className="input">
                    <span className="details">Discount (percent) %</span>
                    <input className="input-box" value={discount} onChange={handleDiscountChange} name='product_discount' type="number" placeholder="Enter discount (default is 0)" />
                </div>
                <div className="input">
                    <label className="details">Images / Product have {images.length} images</label>
                    <input className="form-control input-box" accept="image/*" onChange={handleUploadedImagesChange} name="product_images" type="file" id="formFileMultiple" multiple disabled={images.length === 4}/> 
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
                    <textarea value={description} className='input-box textarea'onChange={handleDescriptionChange} name="product_description" cols="30" rows="4" required></textarea>
                </div>
            </div>
            <div className="choose-details">
                <span className="choose-title">Still available</span>
                <div className="choose">
                <label htmlFor="yes">
                    {
                        (still_available === true) ? 
                        <input type="radio" checked onChange={handleStill_availableChange} value={true} name="still_available" id="yes"/> 
                        :
                        <input type="radio" onChange={handleStill_availableChange} value={true} name="still_available" id="yes"/>
                    }
                    <span id="yes">yes</span>
                    </label>
                    <label htmlFor="no">
                    {
                        (still_available === false) ?
                        <input type="radio" checked onChange={handleStill_availableChange} value={false} name="still_available" id="no"/> 
                        :
                        <input type="radio" onChange={handleStill_availableChange} value={false} name="still_available" id="no"/>
                    }
                    <span id="no">no</span>
                    </label>
                </div>
            </div>
            <div className="choose-details">
                <span className="choose-title">Chosen for you</span>
                <div className="choose">
                    <label htmlFor="yes2">
                        {
                            (chose_for_you === true) ? 
                            <input type="radio" checked onChange={handleChose_for_youChange} value={true} name="chose_for_you" id="yes2"/> 
                            :
                             <input type="radio" onChange={handleChose_for_youChange} value={true} name="chose_for_you" id="yes2"/>
                        }
                        <span id="yes2">yes</span>
                    </label>
                    <label htmlFor="no2">
                    {
                        (chose_for_you === false) ? 
                        <input type="radio" checked onChange={handleChose_for_youChange} value={false} name="chose_for_you" id="no2"/> 
                        :
                        <input type="radio" onChange={handleChose_for_youChange} value={false} name="chose_for_you" id="no2"/>
                    }
                    <span id="no2">no</span>
                    </label>
                </div>
            </div>
                    {responseError && <p className='text-danger fw-bold'>{responseError.response.data.message}</p>}
                    {success && <p className='text-success fw-bold'>{success}</p>}
                <div className="button">
                    <input type="submit" value="Update Product" />
                </div>
        </form>
    </div>
    {images.length > 0 && <>
        <div>
            <h3>Product Images</h3>
            <form className='images_form' onSubmit={handleDeleteImages}>
            <div className='d-flex gap-3'>
                {images.map((img, key) => (
                        <div className='delete_img' key={img._id}>
                            <div><img src={img.url} alt="" /></div>
                            <label className='input-cont'>
                                <input name='deleteImages[]' value={img.filename} onChange={handleCheckedImages} id={`check-${key}`} type="checkbox" />
                                <span htmlFor={`check-${key}`}>Select to delete</span>
                            </label>
                        </div>
                    ))}
            </div>
            {imagesUploadError && <p className='text-danger my-3'>{imagesUploadError}</p>}
            {ImageDeletedSuccess && <p className='text-success my-3'>{ImageDeletedSuccess}</p>}
            <button className='btn btn-danger mt-3'>Delete images</button>
            </form>
        </div>
    </>}
    </div>
            </>
            }
        </div>
    );
}

export default EditProduct;