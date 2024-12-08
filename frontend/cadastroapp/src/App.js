import React from 'react';
import './App.css';
import ProductList from './components/productList';
import AddProduct from './components/addProduct';
import SupplierList from './components/supplierList';
import AddSupplier from './components/addSupplier';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestão de Estoque Show Papai + Aglison</h1>
      </header>
      <ProductList />
      <AddProduct />
      <SupplierList />
      <AddSupplier />
    </div>
  );
}

export default App;