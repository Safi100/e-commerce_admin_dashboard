import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios'
const columns = [
  { field: 'id', headerName: 'ID', width: 230 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', type: 'String', width: 190},
];


export default function DataTable() {
  const [rows, setRows] = React.useState([])
  React.useEffect(()=> {
    const fetchUsers = async () => {
      try{
        const response = await Axios.get('http://localhost:8000/customers')
        const customers = response.data
        customers.forEach((customer, key) => (
          setRows(prevCustomer => [...prevCustomer,  { id: customer._id, lastName: customer.last_name, firstName: customer.first_name, email: customer.email }])
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
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
    </div>
  );
}