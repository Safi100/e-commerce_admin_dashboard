import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './brand.css'
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { AuthContext } from "../../context/AuthContext";

const columns = [
    { field: 'BrandName', headerName: 'All Brands', width: 330 },
  ];

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

const Brand = () => {
    const {user} = React.useContext(AuthContext)
    const [brands, setBrands] = useState([])
    const [brand, setBrand] = useState('')
    const [error, setError] = useState('')
    const [result, setResult] = useState(false)
    useEffect(()=> {
        Axios.get('http://localhost:8000/brand',{
          headers: {authorization: "Bearer " + user.token}
        })
        .then(res => {setBrands(res.data)})
        .catch(err => console.log(err))
    }, [result])

    const handleInputBrand = (e) => {
        const text = e.target.value.trimStart() 
        setBrand(text)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:8000/brand', {brand})
        .then(res => setResult(res.data))
        .catch(err => {
            if(err.response.data.includes("duplicate key")){
                setError(`${brand.toLowerCase()} is added before.`)
            }
        })
        setBrand("")
    }
    return (
        <div className="wrapper">
            <h3>All brands</h3>
            <div style={{ height: 300, width: 500 }}>
            <DataGrid
              rows={brands}
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
                <div className="title">Add Brand</div>
                <form className='form' onSubmit={handleSubmit}>
                    <input value={brand} onChange={handleInputBrand} className='input-box' type="text"  required/>
                    {error && <p className='text-danger fw-bold'>{error}</p>}
                    <div>
                        <ColorButton type='submit' variant="contained">Add Brand</ColorButton>
                    </div>
                </form>
          </div>
        </div>
    );
}

export default Brand;
