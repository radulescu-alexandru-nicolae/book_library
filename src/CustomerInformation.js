import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination } from '@mui/material';

function CustomerInformation() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, perPage]);

  const fetchCustomers = () => {
    const apiUrl = `http://localhost:3000/api/customers?page=${currentPage + 1}&perPage=${perPage}`;
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        return response.json();
      })
      .then(data => {
        console.log('API response:', data); // Log the data received from the API
        if (!data || !Array.isArray(data.custoemrs)) {
          throw new Error('Invalid data format');
        }
        setCustomers(data.custoemrs);
        setTotalPages(data.totalNumberOfPages); // Update totalPages based on API response
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        setError(error.message);
        console.error('Error fetching customers:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalPages * perPage}
        rowsPerPage={perPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[]} // Remove rows per page dropdown
      />
    </div>
  );
}

export default CustomerInformation;
