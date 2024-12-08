const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, type, current_quantity, minimum_quantity, supplier_id } = req.body;

        if (!name || !description || !type || current_quantity === undefined || minimum_quantity === undefined || !supplier_id) {
            return res.status(400).json({ 
                message: 'Todos os campos são obrigatórios.' 
            });
        }

        if (current_quantity < 0 || minimum_quantity < 0) {
            return res.status(400).json({ 
                message: 'Quantidade não pode ser negativa.' 
            });
        }

        const [result] = await db.query(
            'INSERT INTO products (name, description, type, current_quantity, minimum_quantity, supplier_id) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, type, current_quantity, minimum_quantity, supplier_id]
        );
        
        res.status(201).json({ 
            id: result.insertId,
            name,
            description,
            type,
            current_quantity,
            minimum_quantity,
            supplier_id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;