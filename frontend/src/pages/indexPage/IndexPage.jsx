import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './indexPage.css'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import { AuthContext } from "../../context/AuthContext";

const IndexPage = () => {
    const {user} = React.useContext(AuthContext)
    const [CustomerCount, setCustomerCount] = useState(0)
    const [ProductCount, setProductCount] = useState(0)
    const [newCustomers, setnewCustomers] = useState([])
    useEffect(()=> {
        async function fetchData(){
            try{
                const response = await Axios.get('http://localhost:8000/')
                const result = response
                const customerCount = result.data.CustomerCount
                setCustomerCount(customerCount)
                const newCustomers = result.data.NewCustomers
                setnewCustomers(newCustomers)
                const productCount = result.data.productsCount
                setProductCount(productCount)
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
                        <p>512</p>
                        <p>Orders (accepted)</p>
                    </div>
                </div>
                <div>
                    <div className="circle"><PaidOutlinedIcon /></div>
                    <div>
                        <p>$8,214</p>
                        <p>Earnings</p>
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
        </div>
    );
}

export default IndexPage;
