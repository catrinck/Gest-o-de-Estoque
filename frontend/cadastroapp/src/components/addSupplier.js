import React, { useState } from 'react';
import axios from 'axios';

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
    setSuccess(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      cnpj: '',
      phone: '',
      address: ''
    });
    setSuccess(true);
    setError(null);
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone) {
      setError('Nome e telefone são obrigatórios');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:3000/api/suppliers', formData);
      if (response.status === 201) {
        resetForm();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao adicionar fornecedor');
      console.error('Erro ao adicionar fornecedor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-supplier-form">
      <h2>Adicionar Fornecedor</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Fornecedor adicionado com sucesso!</div>}
      
      <form onSubmit={handleSubmit}>
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
          name="cnpj" 
          placeholder="CNPJ"
          value={formData.cnpj} 
          onChange={handleChange}
          disabled={isLoading}
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Telefone"
          value={formData.phone} 
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
        <input 
          type="text" 
          name="address" 
          placeholder="Endereço"
          value={formData.address} 
          onChange={handleChange}
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Adicionando...' : 'Adicionar Fornecedor'}
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;