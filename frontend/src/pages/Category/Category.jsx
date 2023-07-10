import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './category.css'
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';

const columns = [
    { field: 'CategoryName', headerName: 'All Categories', width: 330 },
  ];

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

const Category = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState('')
    const [result, setResult] = useState(false)
    useEffect(()=> {
        Axios.get('http://localhost:8000/category')
        .then(res => {setCategories(res.data)})
        .catch(err => console.log(err))
    }, [result])

    const handleInputCategory = (e) => {
      const text = e.target.value.trimStart() 
      setCategory(text)
    }
    const handleImageChange = (e) => {
      setImage(...e.target.files)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('categoryName', category)
        formData.append('categoryImage', image)
        Axios.post('http://localhost:8000/category', formData)
        .then(res => setResult(res.data))
        .catch(err => {
            console.log(err);
            if(err.response.data.includes("duplicate key")){
                setError(`${category.toLowerCase()} is added before.`)
            }
        })
        setCategory("")
        e.target.reset()
    }
    return (
        <div className="wrapper">
            <h3>All Categories</h3>
            <div style={{ height: 300, width: 500 }}>
            <DataGrid
              rows={categories}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              checkboxSelection
            />
          </div>
          <div className='mt-3'>
                <div className="title">Add Category</div>
                <form className='form' onSubmit={handleSubmit}>
                  <input className='input-box' onChange={handleImageChange} accept="image/*" type="file" required/>
                    <input value={category} onChange={handleInputCategory} className='input-box' type="text" placeholder='Category name'  required/>
                    {error && <p className='text-danger fw-bold mb-2'>{error}</p>}
                    <div>
                        <ColorButton type='submit' variant="contained">Add Category</ColorButton>
                    </div>
                </form>
          </div>
        </div>
    );
}

export default Category;
