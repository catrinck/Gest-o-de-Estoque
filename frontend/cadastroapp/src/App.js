import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import AddProduct from 'C:\\Users\\catri\\react-app\\frontend\\cadastroapp\\src\\components\\addProduct.js'
import AddSupplier from 'C:\\Users\\catri\\react-app\\frontend\\cadastroapp\\src\\components\\addSupplier.js';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        {/* Sidebar fixa */}
        <Sidebar />

        {/* Conteúdo principal */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-supplier" element={<AddSupplier />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
