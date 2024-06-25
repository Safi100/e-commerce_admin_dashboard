import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios'

const columns = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', type: 'String', width: 190},
  { field: 'reviews', headerName: 'Reviews', type: 'String', width: 130},
  { field: 'orderCount', headerName: 'Orders', type: 'String', width: 130},
  {field: 'profile', headerName: 'Profile', width: 150,
    renderCell: (params) => (
      <a href={`/customer/${params.row.id}`}
        style={{ textDecoration: 'none', color: 'white', backgroundColor: '#3f51b5', padding: '6px 12px', borderRadius: '4px' }}>
        View Profile
      </a>
    )
  },
];

export default function DataTable() {
  const [rows, setRows] = React.useState([])
  React.useEffect(()=> {
    const fetchUsers = async () => {
      try{
        const response = await Axios.get('http://localhost:8000/customers/fetch-customers')
        const customers = response.data
        console.log(response.data);
        customers.forEach((customer, key) => (
          setRows(prevCustomer => [...prevCustomer, 
            { id: customer._id, lastName: customer.last_name, firstName: customer.first_name,
              email: customer.email, reviews: customer.reviews.length, orderCount: customer.orderCount}])
        ))
      }catch(err){
        console.log(err);
      }
    }
    fetchUsers()
      }, [])
  return (
        <div className="wrapper">
          <h2 className='heading_text'>Customers</h2>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              checkboxSelection
            />
          </div>
    </div>
  );
}