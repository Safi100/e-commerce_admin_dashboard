import  Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import  './productProfile.css'
import NoImage from '../../assets/image-placeholder.png'
import { AuthContext } from "../../context/AuthContext";
const ProductProfile = () => {
    const {user} = React.useContext(AuthContext)
    const [product, setProduct] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { id } = useParams()
    useEffect(()=> {
        Axios.get(`http://localhost:8000/products/${id}`, {
            headers: {authorization: "Bearer " + user.token}
        })
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
                    <div className="selected__photo">
                    {product.images.length > 0 ? 
                        <img src={product.images[selectedIndex].url} alt={`${product.images[selectedIndex].url}`} />
                        :<img src={NoImage} alt={`product have no images`} /> }
                    </div>
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
                <h3 className='mb-3'>Product description</h3>
                <div className='product_description' >
                {product.description.split(/\r\n|\n/).map((line, index) => (
                   <div className='d-flex mb-2'>
                    <li className='dot_list' key={index}></li>
                    <>{line}</>
                    </div>
                ))}
                </div>
            </div>
        </div>
        </>
        }
    </>
    );
}

export default ProductProfile;
