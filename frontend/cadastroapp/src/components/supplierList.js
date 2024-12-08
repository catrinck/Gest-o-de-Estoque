import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:3000/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      setError('Erro ao carregar fornecedores: ' + 
        (error.response?.data?.message || error.message));
      console.error('Ocorreu um erro.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Lista de Fornecedores</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Lista de Fornecedores</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchSuppliers}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Lista de Fornecedores</h2>
      {suppliers.length === 0 ? (
        <p>Nenhum fornecedor cadastrado.</p>
      ) : (
        <ul>
          {suppliers.map(supplier => (
            <li key={supplier.id}>
              <strong>{supplier.name}</strong> - Tel: {supplier.phone}
              {supplier.cnpj && <span> - CNPJ: {supplier.cnpj}</span>}
              {supplier.address && <p>Endereço: {supplier.address}</p>}
            </li>
          ))}
        </ul>
      )}
      <button onClick={fetchSuppliers}>Atualizar Lista</button>
    </div>
  );
};

export default SupplierList;