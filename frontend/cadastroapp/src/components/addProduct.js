import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    current_quantity: 0,
    minimum_quantity: 0,
    supplier_id: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('quantity') ? parseInt(value) || 0 : value
    }));
    setError(null);
    setSuccess(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: '',
      current_quantity: 0,
      minimum_quantity: 0,
      supplier_id: ''
    });
    setSuccess(true);
    setError(null);
  };

  const validateForm = () => {
    if (formData.current_quantity < 0 || formData.minimum_quantity < 0) {
      setError('As quantidades não podem ser negativas');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Verify supplier exists
      const supplierResponse = await axios.get('http://localhost:3000/api/suppliers');
      const supplierExists = supplierResponse.data.some(
        supplier => supplier.id.toString() === formData.supplier_id.toString()
      );

      if (!supplierExists) {
        throw new Error('Fornecedor não encontrado');
      }

      // Submit product
      const response = await axios.post('http://localhost:3000/api/products', formData);
      
      if (response.status === 201) {
        setSuccess(true);
        resetForm();
        if (onProductAdded) {
          onProductAdded(response.data);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Erro ao adicionar o produto');
      console.error('Erro ao adicionar produto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Adicionar Produto</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Produto adicionado com sucesso!</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <input 
          type="text" 
          name="name" 
          placeholder="Nome" 
          value={formData.name}
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
        <input 
          type="text" 
          name="description" 
          placeholder="Descrição" 
          value={formData.description}
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
        <input 
          type="text" 
          name="type" 
          placeholder="Tipo" 
          value={formData.type}
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
        <input 
          type="number" 
          name="current_quantity" 
          placeholder="Quantidade Atual" 
          value={formData.current_quantity}
          onChange={handleChange} 
          required 
          min="0"
          disabled={isLoading}
        />
        <input 
          type="number" 
          name="minimum_quantity" 
          placeholder="Quantidade Mínima" 
          value={formData.minimum_quantity}
          onChange={handleChange} 
          required 
          min="0"
          disabled={isLoading}
        />
        <input 
          type="text" 
          name="supplier_id" 
          placeholder="ID do Fornecedor" 
          value={formData.supplier_id}
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Adicionando...' : 'Adicionar Produto'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;