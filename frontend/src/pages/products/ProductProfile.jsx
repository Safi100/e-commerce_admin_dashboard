import  Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import  './productProfile.css'
const ProductProfile = () => {
    const [product, setProduct] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { id } = useParams()
    useEffect(()=> {
        Axios.get(`http://localhost:8000/products/${id}`)
        .then(res => {
            setProduct(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setError(err)
        })
    }, [])
    return (
    <>
        {error && <h2 className='text-danger m-3'>{error.response.data}</h2>}
        {(loading && !error) && <h2 className='m-3'>Loading...</h2>}
        {!loading && <>
        <div className='productProfile_container'>
        <div className="product_container">
                {console.log(product)}
                <div className="thumbnails">
                    <div className="group__photo">
                        {product.images?.map((image, index) => (
                            <div onClick={()=> setSelectedIndex(index)} className={`img__div ${(selectedIndex === index) ? "selected" : ""}`} key={image._id}>
                                <img className={(selectedIndex === index) ? "selected__inside" : ""} src={image.url} alt="" />
                            </div>
                        ))}
                    </div>
                    {product.images ? 
                    <div className="selected__photo">
                        <img src={product.images[selectedIndex].url} alt={`${product.images[selectedIndex].url}`} />
                    </div> 
                    : null}
                </div>
                <div className="product_info">
                    <h2 className='product_title'>{product.title}</h2>
                    <p>stars, {product.reviews.length}</p>
                    <p className='price mt-2'>
                        <span className='fs-2'><sup className='sign fs-4'>$</sup>{product.priceToPay}</span>
                        {(product.price !== product.priceToPay ) ? <span className='priceBefore text-secondary'>${product.price}</span> : ""}
                    </p>
                    <p className={(product.discount > 0) ? "text-danger" : "text-secondary"}>{(product.discount > 0) ? `Discount: %${product.discount}` : "No discount"}</p>
                    <p className='mt-1'>Category: <span className='fw-bold'>{product.category.CategoryName}</span></p>
                    <p className='mt-1'>Brand: <span className='fw-bold'>{product.brand.BrandName}</span></p>
                    <p className="card-text mt-1">Added on <span className='fw-bold'>{new Date(product.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</span></p>
                    <p className='mt-1'>Last Update: <span className='fw-bold'>{new Date(product.updatedAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</span></p>
                    {product.chose_for_you && <p className='mt-1'>Chosen for customer</p>}
                    {!product.chose_for_you && <p className='mt-1'>Not chosen for customer</p>}
                    {product.still_available && <p className='mt-1'>Available on Warehouse</p>}
                    {!product.still_available && <p className='text-danger mt-1'>Not available on Warehouse</p>}
                    <a href={`/products/${product._id}/edit`} className='btn btn-sm btn-warning mt-2'>Update product</a>
                </div>
            </div>
            <div className='mt-4'>
                <h3>Product description</h3>
                <p className='product_description'>{product.description}</p>
            </div>
        </div>
        </>
        }
    </>
    );
}

export default ProductProfile;
