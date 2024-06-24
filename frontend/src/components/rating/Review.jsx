import React, { useEffect, useState } from 'react';
import './review.css'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Review = ({review, isProductProfile, isCustomerProfile}) => {
    const [open, setOpen] = useState(false)
    const handleClick = (open) => {
        setOpen(!open)
    }
    return (
        <div className='review'>
            <div className="review_header">
                <div className="left">
                    <h4 className="review_title">{review.title}</h4>      
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
            {!isCustomerProfile && <span className='reviewer_name'>By {review.author.first_name + " " + review.author.last_name}</span>}
            <p className='reviewd_date'>reviewd { !isProductProfile && <a href={`/products/${review.product._id}`}><span>{review.product?.brand.BrandName + " " + review.product.category.CategoryName}</span></a>} on {new Date(review.createdAt).toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'})}</p>
            <div className="review_body">
                <p className={((review.body.length < 200) && !review.image.url) ? "" : (!open && "cut")} >
                    <p>{review.body}</p>
                    {review.image.url && <img className='review_image' src={review.image.url} alt="" /> }
                    </p>
            </div>
            <div className="review_footer">
                {((review.body.length < 200) && !review.image.url)  ? "" : <p onClick={()=> {handleClick(open)}} 
                className='read_more_btn'>{(open === false) ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon /> } 
                <span className='read_more'>Read {(open === false) ? "more" : "less" }</span></p>}
            </div>
        </div>
    );
}

export default Review;
