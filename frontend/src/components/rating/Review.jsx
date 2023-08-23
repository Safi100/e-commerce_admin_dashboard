import React, { useEffect, useState } from 'react';
import './review.css'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Review = ({review}) => {
    const [open, setOpen] = useState(false)
    const [showReadMore, setShowReadMore] = useState(false);
    const handleClick = (open) => {
        setOpen(!open)
    }
    return (
        <div className='review'>
            <div className="review_header">
                <div className="left">
                    {/* <img className='reviewer_image' src={CustomerImage} alt="Customer Image" /> */}
                    <span className='reviewer_name'>{review.author.first_name + " " + review.author.last_name}</span>
                </div>
                <div className="right">
                    <Box
                        sx={{
                            width: 120,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                        <Rating
                            name="text-feedback"
                            value={review.rating}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </Box>
                </div>
            </div>
            <p className='reviewd_date'>reviewd <a href={`/products/${review.product._id}`}>{review.product.title}</a> on {new Date(review.createdAt).toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'})}</p>
            <h4 className="review_title">{review.title}</h4>
            <div className="review_body">
                <p className={(review.body.length < 200) ? "" : (!open && "cut")} >{review.body}</p>
            </div>
            <div className="review_footer">
                {(review.body.length < 200) ? "" : <p onClick={()=> {handleClick(open)}} 
                className='read_more_btn'>{(open === false) ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon /> } 
                <span className='read_more'>Read {(open === false) ? "more" : "less" }</span></p>}
            </div>
        </div>
    );
}

export default Review;
