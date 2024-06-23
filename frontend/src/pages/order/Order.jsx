import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './orders.css'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [orderBy, setorderBy] = useState('');
    const [openOrder, setOpenOrder] = useState({});

    useEffect(() => {
        Axios.get(`http://localhost:8000/orders?orderBy=${orderBy}`)  
        .then((res) => {
            console.log(res.data);
            setOrders(res.data);
            setLoading(false);
        })
        .catch((err) => (console.log(err)))
    }, [orderBy])

    const handleOrderByChange = (event) => {
        setorderBy(event.target.value);
    };
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    const toggleAddress = (orderId) => {
        setOpenOrder(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

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
                  <MenuItem value={"newest_orders"}>Newest orders</MenuItem>
                  <MenuItem value={"highest_price"}>highest price</MenuItem>
                  <MenuItem value={'lowest_price'}>Lowest price</MenuItem>
                </Select>
            </FormControl>
            {loading ?
            <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
                <div className="spinner-border text-success" role="status"></div>
            </div>
            :
            <div className='orders'>
                <h2>Orders ({orders.length})</h2>
                {orders.length > 0 ? 
                orders.map(order => (
                    <div className='order card' key={order._id}>
                        <div className='card-header d-flex gap-5'>
                            <div className='d-flex flex-column'>
                                <span>ORDER PLACED</span>
                                <span>{formatDate(order.createdAt)}</span>
                            </div>
                            <div className='d-flex flex-column'>
                                <span>TOTAL</span>
                                <span>${order.totalPrice}</span>
                            </div>
                            <div className='d-flex flex-column'>
                                <span>SHIPPING COST</span>
                                <span>${order.deliveryCost}</span>
                            </div>
                            <div className='d-flex flex-column position-relative' role="button" onClick={() => toggleAddress(order._id)}>
                                <span>SHIPING ADDRESS</span>
                                <span>{openOrder[order._id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                                {openOrder[order._id] && <div className='address'>
                                    <p className='m-0'>{order.address.recipient_name}</p>
                                    <p className='m-0'>{order.address.street_address}</p>
                                    <p className='m-0'>{order.address.city}</p>
                                    <p className='m-0'>{order.address.postal_code}</p>
                                    <p className='m-0'>{order.address.phone_number}</p>
                                </div>}
                            </div>
                        </div>
                        <div className='order_items card-body'>
                            {order.items.map(item => (
                                <div className='d-flex order gap-4 order_item_info' key={item.product._id}>
                                    <a className='d-flex align-items-center' href={`/products/${item.product._id}`}>
                                        <img src={item.product.images[0].url} alt={item.product._id} />
                                    </a>
                                    <div>
                                        <a href={`/products/${item.product._id}`}>{item.product.title}</a>
                                        <p className='mt-2'>${item.price_when_order} x {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
                :
                <h2 className='text-danger'>You have no orders.</h2> 
                }
            </div>
            }
        </div>
    );
}

export default Order;
