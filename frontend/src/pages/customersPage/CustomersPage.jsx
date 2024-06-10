import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios'
import { AuthContext } from "../../context/AuthContext";
const columns = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', type: 'String', width: 190},
];


export default function DataTable() {
  const {user} = React.useContext(AuthContext)
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
              pageSizeOptions={[5, 10, 20, 50, 100]}
              checkboxSelection
            />
          </div>
    </div>
  );
}