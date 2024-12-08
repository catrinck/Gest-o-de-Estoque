const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const suppliersFilePath = path.join(__dirname, '../data/suppliers.json');

const readSuppliersFile = () => {
    const data = fs.readFileSync(suppliersFilePath);
    return JSON.parse(data);
};

const writeSuppliersFile = (data) => {
    fs.writeFileSync(suppliersFilePath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    try {
        const suppliers = readSuppliersFile();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { name, cnpj, phone, address } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ message: 'Nome e telefone são obrigatórios.' });
        }

        const suppliers = readSuppliersFile();
        
        if (cnpj && suppliers.some(s => s.cnpj === cnpj)) {
            return res.status(400).json({ message: 'CNPJ já cadastrado.' });
        }

        const newSupplier = {
            id: suppliers.length ? suppliers[suppliers.length - 1].id + 1 : 1,
            name,
            cnpj,
            phone,
            address
        };

        suppliers.push(newSupplier);
        writeSuppliersFile(suppliers);

        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;