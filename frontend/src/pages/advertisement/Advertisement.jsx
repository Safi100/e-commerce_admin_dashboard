import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './advertisement.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { green, purple } from '@mui/material/colors';
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));
const Advertisement = () => {
    const [advertisements, setAdvertisements] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [advertisementImage, setAdvertisementImage] = useState('')
    const [advertisementLink, setAdvertisementLink] = useState('')
    const [success, setSuccess] = useState('')
    const handleInputLink = (e) => {
        const text = e.target.value.trimStart() 
        setAdvertisementLink(text)
      }
      const handleImageChange = (e) => {
        setAdvertisementImage(...e.target.files)
      }
      const handleSubmt = (e) => {
        setSuccess(false)
        e.preventDefault()
        let formData = new FormData();
        formData.append('advertisementLink', advertisementLink)
        formData.append('advertisementImage', advertisementImage)
        Axios.post('http://localhost:8000/advertisement')
        .then(res => setSuccess(true))
        e.target.reset()
        setAdvertisementImage('')
        setAdvertisementLink('')
      }
    useEffect(()=> {
        Axios.get('http://localhost:8000/advertisement')
        .then(res => {
            setAdvertisements(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [success])
    return (
        <div className='p-3'>
            <div className="advertisement_cont">
                {advertisements.length === 0 && <h2 className='text-danger mb-5'>There's no advertisement yet.</h2>}
                {}
            </div>
            <form className='adv'>
                <div className="title">Add Advertisement</div>
                <input className='input-box mb-2' accept="image/*" type="file" placeholder='Advertisement image' required/>
                <input value={advertisementLink} className='input-box mb-3' type="text" placeholder='Advertisement link (/products/)' required/>
                    {error && <p className='text-danger fw-bold mb-2'>{error}</p>}
                    <div>
                        <ColorButton type='submit' variant="contained">Add Advertisement</ColorButton>
                    </div>
            </form>
        </div>
    );
}

export default Advertisement;
