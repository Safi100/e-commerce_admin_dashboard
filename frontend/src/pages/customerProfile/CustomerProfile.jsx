import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import Review from '../../components/rating/Review'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './customerProfile.css'

const CustomerProfile = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null)
    const [orders, setOrders] = useState([])
    const [openOrder, setOpenOrder] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        Axios.get(`http://localhost:8000/customers/${id}`)
        .then(res => {
            setCustomer(res.data.customer);
            setOrders(res.data.orders)
            console.log(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            setError(err.response.data.message);
            console.log(err);
        })
        console.log(customer);
    }, [])

    const toggleAddress = (orderId) => {
        setOpenOrder(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    return (
        <div className='wrapper'>
            {loading ? <h2>Loading...</h2> :
            <>
                {error && <h2 className='text-danger'>{error}</h2> }
                {customer &&
                    <div>
                        <h2 className='title fs-2'>Customer Profile</h2>
                        <div className='customer_profile'>
                            <div className='customer_info'>
                                <p className='customer_name'>Name: <span className='fw-bold'>{customer.first_name} {customer.last_name}</span></p>
                                <p className='customer_email'>Email: <span className='fw-bold'>{customer.email}</span></p>
                                <p>Join at <span className='fw-bold'>{new Date(customer.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span></p>
                                <div className='customer_address mt-3'>
                                    <h3>Address:</h3>
                                    <ul className='p-0'>
                                        <li>Recipient name: <span className='fw-bold'>{customer.address?.recipient_name}</span></li>
                                        <li>Phone number: <span className='fw-bold'>{customer.address?.phone_number}</span></li>
                                        <li>City: <span className='fw-bold'>{customer.address?.city}</span></li>
                                        <li>Street address: <span className='fw-bold'>{customer.address?.street_address}</span></li>
                                        <li>Postal code: <span className='fw-bold'>{customer.address?.postal_code}</span></li>
                                    </ul>
                                </div>
                                <div className='my-4'>
                                    <h3>Reviews ({customer.reviews?.length})</h3>
                                    <div>
                                    {customer.reviews?.map(review => (
                                        <Review key={review._id} review={review} isCustomerProfile={true} />
                                    ))}
                                    </div>
                                </div>
                                <div className='orders'>
                                    <h2>Orders ({orders.length})</h2>
                                    {orders.map(order => (
                                        <div className='order card' key={order._id}>
                                            <div className='card-header d-flex gap-5'>
                                                <div className='d-flex flex-column'>
                                                    <span>ORDER PLACED</span>
                                                    <span>{new Date(order.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
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
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
            }
        </div>
    );
}

export default CustomerProfile;
