import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './reviews.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Review from '../../components/rating/Review';
import { AuthContext } from "../../context/AuthContext";
const Reviews = () => {
    const {user} = React.useContext(AuthContext)
    const [orderBy, setorderBy] = useState('');
    const [filterByCategory, setFilterByCategory] = useState('')
    const [reviews, setReviews] = useState([])
    const [categories, setCategories] = useState([])
    const handleOrderByChange = (event) => {
        setorderBy(event.target.value);
      };
    const handleFilterByCategoryChange = (event) => {
      setFilterByCategory(event.target.value);
      };
      useEffect(()=> {
        Axios.get(`http://localhost:8000/category`)
        .then(res => {setCategories(res.data)})
        .catch(err => console.log(err))
      }, [])
      useEffect(()=> {
        Axios.get(`http://localhost:8000/reviews?orderBy=${orderBy}&category=${filterByCategory}`)
        .then(res => {setReviews(res.data)})
        .catch(err => console.log(err))
      }, [orderBy, filterByCategory])
    
    return (
        <div className='wrapper'>
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
                  <MenuItem value={"newest"}>Newest Rating</MenuItem>
                  <MenuItem value={"top"}>Top Rating</MenuItem>
                  <MenuItem value={'lowest'}>Lowest Rating</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ mb: 2, ml: 4, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-autowidth-label2">Filter by category</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label2"
                  id="demo-simple-select-autowidth2"
                  value={filterByCategory}
                  onChange={handleFilterByCategoryChange}
                  autoWidth
                  label=">Filter by category"
                  >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={`${category.CategoryName}`}>{category.CategoryName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {reviews.length === 0 && <h3 className='text-danger'>No reviews yet</h3>}
            <div className="reviews_container">
                {reviews.map((review) => (
                  <Review review={review} key={review._id}/>
                  ))}
            </div>
        </div>
    );
}

export default Reviews;
