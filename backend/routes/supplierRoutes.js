// Modified routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const [suppliers] = await db.query('SELECT * FROM suppliers');
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, cnpj, phone, address } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ message: 'Nome e telefone são obrigatórios!' });
        }

        const [result] = await db.query(
            'INSERT INTO suppliers (name, cnpj, phone, address) VALUES (?, ?, ?, ?)',
            [name, cnpj || null, phone, address || null]
        );
        
        res.status(201).json({ 
            id: result.insertId,
            name,
            cnpj,
            phone,
            address
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;