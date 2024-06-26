import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import NoImage from '../../assets/image-placeholder.png'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Brand_Category_Selected from '../../components/Brand_Category_Selected/Brand_Category_Selected'
import './products.css'
import { AuthContext } from "../../context/AuthContext";
const Products = () => {
    const [Products, setProducts] = useState([])
    const [orderBy, setorderBy] = useState('');
    const [brandSelected, setBrandSelected] = useState([])
    const [categorySelected, setCategorySelected] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const handleOrderByChange = (event) => {
        setorderBy(event.target.value);
    };
    useEffect(()=> {
        Axios.get(`http://localhost:8000/products?orderBy=${orderBy}&category=${categorySelected}&brand=${brandSelected}&title=${search}`)
        .then(res => {
            setProducts(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [categorySelected, brandSelected, orderBy, search])

    const HandleSearch = (e) => {
        const text = e.target.value.trimStart()
        setSearch(text)
    }

    return (
        <>
        <div className='p-3 w-100'>
        {loading && <h2>Loading...</h2>}
        {(Products.length === 0 && !search && !loading) && <h2 className='text-center text-danger m-auto fs-1'>No products yet<p className=' fs-2'><a className='link' href="/products/new">Add new product</a></p></h2>}    
        {(Products.length > 0 || search) && <>
            <div className='d-flex gap-4'>
        <div><a href='/products/new' className='btn btn-primary py-3'>Add new product</a></div>
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
                  <MenuItem value={'newest'}>Newest</MenuItem>
                  <MenuItem value={'avg_rating'}>Average rating</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div>
            <h3>Search for product</h3>
            <div className='search_div'>
            <SearchOutlinedIcon />
            <input value={search} onChange={HandleSearch} type="text"  placeholder='Search for product title...'/>
            </div>
        </div>
        {(Products.length === 0 && search) && <h2 className='text-center text-danger m-auto fs-1'>No products found</h2>}
        </>}
        {(Products.length > 0) && 
        <> 
        <div>
            {Products.map(product => (
                <div className="product mb-4" key={product._id}>
                    <div className='img_container'>
                        <img className='product_image' loading="lazy" src={(product.images.length > 0) ? product.images[0].url : NoImage} alt="" />
                    </div>
                    <div className="product_body">
                        <h5 className="product_title">{product.title}</h5>
                        <p>stars, {product.reviews.length}</p>
                        <p className='price'>
                            <span><sup className='sign'>$</sup>{product.priceToPay}</span>
                            {(product.price !== product.priceToPay ) ? <span className='priceBefore text-secondary'>${product.price}</span> : ""}
                        </p>
                        <p className={(product.discount > 0) ? "text-danger" : "text-secondary"}>{(product.discount > 0) ? `Discount: %${product.discount}` : "No discount"}</p>
                        <p className="card-text mt-1">Added on {new Date(product.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</p>
                        <a href={`/products/${product._id}`} className="btn btn-primary mt-2">Product page</a>
                    </div>
                </div>
            ))}
            
        </div>
        </>
        }
        </div>
        <div><Brand_Category_Selected
         brandSelected={brandSelected} 
         setBrandSelected={setBrandSelected}
         categorySelected={categorySelected}
         setCategorySelected={setCategorySelected} 
         /></div>
        </>
    );
}

export default Products;
