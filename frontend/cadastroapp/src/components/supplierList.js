import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/suppliers')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error('Ocorreu um erro.', error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Fornecedores</h2>
      <ul>
        {suppliers.map(supplier => (
          <li key={supplier.id}>{supplier.name} - {supplier.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;