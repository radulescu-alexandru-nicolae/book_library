import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination } from '@mui/material';

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage]);

  const fetchOrders = () => {
    const apiUrl = `http://localhost:3000/api/orders?page=${page + 1}&perPage=${rowsPerPage}`;
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        console.log(response+ "responseee");
        return response.json();
      })
      .then(data => {
        if (!data || !Array.isArray(data.orders)) {
          throw new Error('Invalid data format');
        }
        setOrders(data.orders);
        setTotalPages(data.totalNumberOfPages);
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        setError(error.message);
        console.error('Error fetching orders:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Book Titles</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Prices</TableCell>
              <TableCell>Total Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{Array.isArray(order.book_titles) ? order.book_titles.join(', ') : order.book_titles}</TableCell>
                <TableCell>{Array.isArray(order.authors) ? order.authors.join(', ') : order.authors}</TableCell>
                <TableCell>{Array.isArray(order.prices) ? order.prices.join(', ') : order.prices}</TableCell>
                <TableCell>{order.total_quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]} // Empty array to remove the Rows per page drop-down
      />
    </div>
  );
}

export default OrdersTable;
