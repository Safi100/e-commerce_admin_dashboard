import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './brand_category_Selected.css'
const Brand_Category_Selected = ({brandSelected, setBrandSelected, categorySelected, setCategorySelected}) => {
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const handleCheckedCategory = (e) => {
        const Category = e.target.value;
        const isChecked = e.target.checked
        if(isChecked){
            setCategorySelected([...categorySelected, Category])
        }else{
            setCategorySelected(categorySelected.filter(item => item !== Category));
        }
    }
    const handleCheckedBrands = (e) => {
        const Brand = e.target.value;
        const isChecked = e.target.checked
        if(isChecked){
            setBrandSelected([...brandSelected, Brand])
        }else{
            setBrandSelected(brandSelected.filter(item => item !== Brand));
        }
    }


    useEffect(()=> {
        Axios.get('http://localhost:8000/brand/getBrandWithCount/')
        .then((res) => setBrands(res.data))

        Axios.get('http://localhost:8000/category/getCategoryWithCount/')
        .then((res) => setCategories(res.data))
    }, [])
    return (
        <div className='brandContainer'>
            <h2 className='fs-4'>Category</h2>
            {categories.map(category => (
                (category.products.length > 0) ?
                <div key={category._id}>
                <label className='d-flex' htmlFor={category._id} >
                    <label htmlFor={category._id}>{category.CategoryName.toUpperCase()} ({category.products.length})</label>
                    <input value={category._id} onChange={handleCheckedCategory} name='categorySelected[]' id={category._id} type="checkbox" />
                </label>
            </div> : ''
            ))}
            <h2 className='fs-4'>Manufacturer</h2>
            {brands.map(brand => (
                (brand.products.length > 0) ?
                <div key={brand._id}>
                <label className='d-flex' htmlFor={brand._id} >
                    <label htmlFor={brand._id}>{brand.BrandName.toUpperCase()} ({brand.products.length})</label>
                    <input value={brand._id} onChange={handleCheckedBrands} name='brandSelected[]' id={brand._id} type="checkbox" />
                </label>
            </div> : ''
            ))}
        </div>
    );
}

export default Brand_Category_Selected;
