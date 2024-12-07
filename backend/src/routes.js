const express = require('express');

const routes = express.Router()

routes.post('/cadastro', (req, res) =>{
    const {nome, CNPJ, telefone, endereco } = req.body;
    const {rua, bairro, numero, cep } = endereco;
    
    res.send([nome, CNPJ, telefone, rua, bairro, numero, cep]);
});

module.exports = routes;