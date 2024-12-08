import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      setError('Erro ao carregar produtos: ' + 
        (error.response?.data?.message || error.message));
      console.error('Ocorreu um erro.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Lista de Produtos</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Lista de Produtos</h2>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchProducts}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Lista de Produtos</h2>
      {products.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong>
              <p>Descrição: {product.description}</p>
              <p>Tipo: {product.type}</p>
              <p>Quantidade atual: {product.current_quantity}</p>
              <p>Quantidade mínima: {product.minimum_quantity}</p>
              <p>ID do fornecedor: {product.supplier_id}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={fetchProducts}>Atualizar Lista</button>
    </div>
  );
};

export default ProductList;