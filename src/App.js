import React from 'react';
import './App.css';
import OrdersInformation from './OrdersInformation.js';
import CustomersInformation from './CustomerInformation.js';

function App() {
  return (
    <div className="App">
      <OrdersInformation />
      <CustomersInformation />
    </div>
  );
}

export default App;
