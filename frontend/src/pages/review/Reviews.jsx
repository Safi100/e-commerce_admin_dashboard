import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './reviews.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Review from '../../components/rating/Review';

const Reviews = () => {
    const [orderBy, setorderBy] = React.useState('');
    const [reviews, setReviews] = useState([])
    const handleChange = (event) => {
        setorderBy(event.target.value);
      };
      useEffect(()=> {
        Axios.get(`http://localhost:8000/reviews?orderBy=${orderBy}`)
        .then(res => {setReviews(res.data)})
        .catch(err => console.log(err))
      }, [orderBy])
    
    return (
        <div className='wrapper'>
            <FormControl sx={{ mb: 2, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={orderBy}
                  onChange={handleChange}
                  autoWidth
                  label=">Sort by"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"newest"}>Newest Rating</MenuItem>
                  <MenuItem value={"top"}>Top Rating</MenuItem>
                  <MenuItem value={'lowest'}>Lowest Rating</MenuItem>
                </Select>
            </FormControl>
            <div className="reviews_container">
                {reviews.map((review) => (
                    <Review review={review} key={review._id}/>
                ))}
            </div>
        </div>
    );
}

export default Reviews;
