import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegação

function Sidebar() {
  const navigate = useNavigate(); // Hook para manipular rotas

  return (
    <div className="sidebar">
      <button onClick={() => navigate('/')}>HOME</button>
      <button onClick={() => navigate('/register-entry')}>REGISTRAR ENTRADA</button>
      <button onClick={() => navigate('/register-exit')}>REGISTRAR SAÍDA</button>
      <button onClick={() => navigate('/register-client')}>CADASTRAR CLIENTE</button>
      <button onClick={() => navigate('/add-supplier')}>CADASTRAR FORNECEDOR</button>
      <button onClick={() => navigate('/add-product')}>CADASTRAR PRODUTOS</button>
      <button onClick={() => navigate('/reports')}>RELATÓRIOS</button>
      <button onClick={() => navigate('/logout')}>SAIR</button>
    </div>
  );
}

export default Sidebar;
