import React, { useState } from 'react';
import axios from 'axios';

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    telefone: '',
    endereco: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/suppliers', formData)
      .then(response => {
        alert('Fornecedor adicionado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao adicionar fornecedor.', error);
      });
  };

  return (
    <div>
      <h2>Adicionar Fornecedor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} />
        <input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} required />
        <input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} />
        <button type="submit">Adicionar Fornecedor</button>
      </form>
    </div>
  );
};

export default AddSupplier;