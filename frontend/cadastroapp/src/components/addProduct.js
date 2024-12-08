import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: '',
    quantidade_atual: 0,
    quantidade_minima: 0,
    fornecedor: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/products', formData)
      .then(response => {
        alert('Produto adicionado com sucesso.');
      })
      .catch(error => {
        console.error('Erro ao adicionar o produo.', error);
      });
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="descricao" placeholder="Descrição" onChange={handleChange} required />
        <input type="text" name="tipo" placeholder="Tipo" onChange={handleChange} required />
        <input type="number" name="quantidade_atual" placeholder="Quantidade Atual" onChange={handleChange} required />
        <input type="number" name="quantidade_minima" placeholder="Quantidade mínima" onChange={handleChange} required />
        <input type="text" name="fornecedor" placeholder="Fornecedor" onChange={handleChange} required />
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default AddProduct;