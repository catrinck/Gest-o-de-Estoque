import React from 'react';
import './App.css';
import ProductList from './components/productList';
import AddProduct from './components/addProduct';
import SupplierList from './components/supplierList';
import AddSupplier from './components/addSupplier';
import Sidebar from './components/Sidebar'; 

function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <Sidebar />
      <header className="App-header">
      </header>
      <AddSupplier />
    </div>
  );
}

export default App;