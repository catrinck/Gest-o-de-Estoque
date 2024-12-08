const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFilePath = path.join(__dirname, '../data/products.json');

const readProductsFile = () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const writeProductsFile = (data) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    try {
        const products = readProductsFile();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { name, description, type, current_quantity, minimum_quantity, supplier_id } = req.body;

        if (!name || !description || !type || current_quantity === undefined || minimum_quantity === undefined || !supplier_id) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        if (current_quantity < 0 || minimum_quantity < 0) {
            return res.status(400).json({ message: 'Quantidade não pode ser negativa.' });
        }

        const products = readProductsFile();
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            name,
            description,
            type,
            current_quantity,
            minimum_quantity,
            supplier_id
        };

        products.push(newProduct);
        writeProductsFile(products);

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;