const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('fala filha das puta');
});

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));

app.listen(3000, () => console.log('servidor rodando na porta 3000'));