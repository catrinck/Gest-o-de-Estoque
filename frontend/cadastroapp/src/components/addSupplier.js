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
      [name]: name === 'phone' ? formatPhone(value) 
            : name === 'cnpj' ? formatCNPJ(value)
            : value
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
    // Nome validation
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
  
    // Phone validation
    if (!formData.phone.trim()) {
      setError('Telefone é obrigatório');
      return false;
    }
  
    // CNPJ validation (optional but must be valid if provided)
    if (formData.cnpj && !validateCNPJ(formData.cnpj)) {
      setError('CNPJ inválido. Use o formato XX.XXX.XXX/XXXX-XX');
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      // Validate form before submission
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }
  
      // Clean CNPJ data before sending
      const submissionData = {
        ...formData,
        cnpj: formData.cnpj.replace(/\D/g, '') // Remove non-digits
      };
  
      const response = await axios.post('http://localhost:3000/api/suppliers', submissionData);
      
      console.log('Server response:', response); // Debug log
      
      if (response.status === 201) {
        setSuccess(true);
        resetForm();
      } else {
        throw new Error('Erro ao adicionar fornecedor');
      }
    } catch (error) {
      console.error('Detailed error:', error);
      setError(
        error.response?.data?.message || 
        'Erro ao adicionar fornecedor. Verifique os dados e tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatCNPJ = (value) => {
    if (!value) return value;
    const cnpj = value.replace(/\D/g, '');
    if (cnpj.length <= 2) return cnpj;
    if (cnpj.length <= 5) return `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
    if (cnpj.length <= 8) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
    if (cnpj.length <= 12) return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  };  
  
  const validateCNPJ = (cnpj) => {
    const strippedCNPJ = cnpj.replace(/\D/g, '');
    
    // If CNPJ is empty, it's optional so return true
    if (!strippedCNPJ) return true;
    
    // Check length
    if (strippedCNPJ.length !== 14) return false;
    
    // Check if all digits are the same
    if (/^(\d)\1+$/.test(strippedCNPJ)) return false;
    
    // Validate CNPJ algorithm
    let sum = 0;
    let pos = 5;
    
    // First digit validation
    for (let i = 0; i < 12; i++) {
      sum += parseInt(strippedCNPJ.charAt(i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(strippedCNPJ.charAt(12))) return false;
    
    // Second digit validation
    sum = 0;
    pos = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(strippedCNPJ.charAt(i)) * pos--;
      if (pos < 2) pos = 9;
    }
    
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(strippedCNPJ.charAt(13))) return false;
    
    return true;
  };

  const formatPhone = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 2) return `(${phoneNumber}`;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    if (phoneNumber.length <= 10) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  return (
    <div className="add-supplier-form">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Fornecedor adicionado com sucesso!</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-container"> 
          <div className="box">NOME</div>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange} 
            required 
            disabled={isLoading}
          /> 
        </div>
        <div className="input-container">
          <div className="box">CNPJ (OPCIONAL)</div>
          <input 
            type="text" 
            name="cnpj" 
            value={formData.cnpj} 
            onChange={handleChange}
            maxLength={18} 
            disabled={isLoading}
          />
        </div>
        <div className="input-container">
          <div className="box">TELEFONE</div>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
            disabled={isLoading}
          />
        </div>
        <div className="input-container">
          <div className="box">ENDEREÇO (OPCIONAL)</div>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Adicionando...' : 'CONFIRMAR CADASTRO DE FORNECEDOR'}
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;
