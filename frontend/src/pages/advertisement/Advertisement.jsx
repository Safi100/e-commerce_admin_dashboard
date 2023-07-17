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
    const [loading,   setLoading] = useState(true)
    const [advertisementLink, setAdvertisementLink] = useState('')
    const [advertisementImage, setAdvertisementImage] = useState('')
    const [advertisementsDeleteError, setAdvertisementsDeleteError] = useState('')
    const [advertisementsDeleteSuccess, setAdvertisementsDeleteSuccess] = useState('')
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
        Axios.post('http://localhost:8000/advertisement', formData)
        .then(res => {
          setSuccess(true)
          setTimeout(() => {
            setSuccess('')
          }, 3000);
        })
        e.target.reset()
        setAdvertisementImage('')
        setAdvertisementLink('')
      }
      const [deleteAdvertisement, setDeleteAdvertisement] = useState([])
      const handleCheckedAdvertisement = (e) => {
        const Advertisement = e.target.value;
        const isChecked = e.target.checked
        if(isChecked){
          setDeleteAdvertisement([...deleteAdvertisement, Advertisement])
        }else{
          setDeleteAdvertisement(deleteAdvertisement.filter(item => item !== Advertisement));
        }
      }
      const handleDeleteAdvertisement = (e) => {
        e.preventDefault()
        if(deleteAdvertisement.length === 0){
          setAdvertisementsDeleteSuccess('')
          setAdvertisementsDeleteError('First select Images to delete')
        }else{
          setAdvertisementsDeleteError('')
          setAdvertisementsDeleteSuccess(`${deleteAdvertisement.length} advertisements deleted successfully`)
          console.log(deleteAdvertisement);
          Axios.post('http://localhost:8000/advertisement/delete', deleteAdvertisement)
          .then(res => {
            setDeleteAdvertisement('')
            setSuccess(!success);
          })
          .catch(err => console.log(err))
        }
        setTimeout(() => {
          setAdvertisementsDeleteSuccess('')
          setAdvertisementsDeleteError('')
        }, 3000);
      }
    useEffect(()=> {
        Axios.get('http://localhost:8000/advertisement')
        .then(res => {
            console.log(res.data);
            setAdvertisements(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [success])

    return (
        <div className='p-3'>
          {loading && <h2>Loading...</h2>}
          {(advertisements.length === 0 && !loading) && <h2 className='text-danger mb-5'>There's no advertisement yet.</h2>}
          {advertisements.length > 0 && 
            <form className="mb-5" onSubmit={handleDeleteAdvertisement}>
                <div className='advertisement_cont'>
                  {advertisements?.map((adv, key) => (
                    <div className='advertisement' key={adv._id}>
                      <div className="image_cont"><img loading='lazy' src={adv.image.url} alt="" /></div>
                      <div className='p-2'>
                        <p>Link: {adv.link}</p>
                        <label className='input-cont'>
                          <input name='deleteAdvertisement[]' value={adv._id} onChange={handleCheckedAdvertisement} id={`check-${key}`} type="checkbox" />
                          <span htmlFor={`check-${key}`}>Select to delete</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {advertisementsDeleteError && <p className='text-danger text-bold mt-2'>{advertisementsDeleteError}</p>}
                {advertisementsDeleteSuccess && <p className='text-success text-bold mt-2'>{advertisementsDeleteSuccess}</p>}
                <button className='btn btn-danger mt-3'>Delete Advertisement</button>
            </form>
          }
            <form className='advForm' onSubmit={handleSubmt} >
                <div className="title">Add Advertisement</div>
                <input onChange={handleImageChange} className='input-box mb-2' accept="image/*" type="file" placeholder='Advertisement image' required/>
                <input onChange={handleInputLink} value={advertisementLink} className='input-box mb-3' type="text" placeholder='Advertisement link (/products/)' required/>
                    {error && <p className='text-danger fw-bold mb-2'>{error}</p>}
                    {success && <p className='text-success fw-bold mb-2'>Advertisement added successfully</p>}
                    
                    <div>
                        <ColorButton type='submit' variant="contained">Add Advertisement</ColorButton>
                    </div>
            </form>
        </div>
    );
}

export default Advertisement;
