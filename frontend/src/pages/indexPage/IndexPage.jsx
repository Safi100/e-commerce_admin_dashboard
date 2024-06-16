import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';
import './indexPage.css'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const IndexPage = () => {

    const [CustomerCount, setCustomerCount] = useState(0)
    const [ProductCount, setProductCount] = useState(0)
    const [newCustomers, setnewCustomers] = useState([])
    const [TotalSales, setTotalSales] = useState(0)
    const [latestOrders, setLatestOrders] = useState([])
    const [ordersCount, setordersCount] = useState(0)
    const [chartData, setChartData] = useState({});

    const generateFakeData = () => {
        const fakeData = [];
        const currentYear = new Date().getFullYear();
    
        for (let month = 1; month <= 12; month++) {
          const deliveryCost = Math.floor(Math.random() * 50) + 10; // Random delivery cost between 10 and 60
          const priceWhenOrder = Math.floor(Math.random() * 100) + 20; // Random price between 20 and 120
          const quantity = Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
          const totalCost = deliveryCost + (priceWhenOrder * quantity);
    
          fakeData.push({
            _id: { year: currentYear, month },
            totalCost,
          });
        }
    
        return fakeData;
      };

    useEffect(()=> {
        async function fetchData(){
            try{
                const response = await Axios.get('http://localhost:8000/')
                const result = response
                setCustomerCount(result.data.CustomerCount)
                setnewCustomers(result.data.NewCustomers)
                setProductCount(result.data.productsCount)
                setordersCount(result.data.ordersCount)
                setLatestOrders(result.data.latestOrders)
                setTotalSales(result.data.total_sales)

                // chart
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const labels = result.data.orders.map(item => `${monthNames[item._id.month - 1]}, ${item._id.year}`);
                const totalCosts = result.data.orders.map(item => item.totalCost);
                setChartData({
                    labels,
                    datasets: [
                    {
                        label: 'Total Cost of Orders Each Month',
                        data: totalCosts,
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 2,
                        fill: false,
                    },
                    ],
                });

                console.log(result.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchData()
    }, [])

    return (
        <div className="wrapper wrapper_main">
            <div className="important_dashboard_data">
                <div>
                    <div className="circle"><PersonOutlinedIcon /></div>
                    <div>
                        {CustomerCount && <p>{CustomerCount}</p>}
                        <p>Customers</p>
                    </div>
                </div>
                <div>
                    <div className="circle"><InventoryOutlinedIcon /></div>
                    <div>
                        <p>{ordersCount}</p>
                        <p>Orders</p>
                    </div>
                </div>
                <div>
                    <div className="circle"><PaidOutlinedIcon /></div>
                    <div>
                        <p>${(TotalSales).toLocaleString()}</p>
                        <p>TOTAL SALES</p>
                    </div>
                </div>
                <div>
                    <div className="circle"><WarehouseOutlinedIcon /></div>
                    <div>
                    {ProductCount && <p>{ProductCount}</p>}
                        <p>Products</p>
                    </div>
                </div>
            </div>

            <div className='mt-4 w-100' style={{ width: '100%', height: '400px' }}>
                {chartData.labels ? (
                    <Line data={chartData} options={{maintainAspectRatio: false, responsive: true}}/>
                ) : (
                    <h4>Loading chart...</h4>
                )}
            </div>

            <div className='latest_data mt-5'>
                <div className='new_customers_container'>
                    <h2 className='mb-3 fs-3'>New customers (within a week)</h2>
                    {newCustomers.length === 0 && <h3 className='text-danger'>No new customers...</h3>}
                    {newCustomers.length > 0 && 
                    <table className='table table-bordered'>
                        <thead className='text-light bg-dark'>
                            <tr>
                                <th>CUSTOMER NAME</th>
                                <th>EMAIL</th>
                                <th>JOIN DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newCustomers.map(customer => (
                                <tr key={customer._id}>
                                    <td>{customer.first_name} {customer.last_name}</td>
                                    <td>{customer.email}</td>
                                    <td>{new Date(customer.createdAt).toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'})}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>                    
                    }
                </div>
                <div className='latest_orders_container'>
                    <h2 className='mb-3 fs-3'>Latest Orders</h2>
                    {latestOrders.length === 0 && <h3 className='text-danger'>No orders yet...</h3>}
                    {latestOrders.length > 0 && 
                    <table className='table table-bordered'>
                    <thead className='text-light bg-dark'>
                        <tr>
                            <th>CUSTOMER NAME</th>
                            <th>TOTAL PRICE</th>
                            <th>ITEMS</th>
                            <th>ORDER DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestOrders.map(order => (
                        <tr key={order._id}>
                            <td>{order.customer.first_name} {order.customer.last_name}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.items.length}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'})}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                    }
                </div>
            </div>
        </div>
    );
}

export default IndexPage;
