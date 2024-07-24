require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const akunRoutes = require('./routers/akunRouter');
const produkRoutes = require('./routers/produkRouter');
const pesananRoutes = require('./routers/pesananRouter');

const app = express();

app.use(bodyParser.json());

app.use('/api/akun', akunRoutes);
app.use('/api/produk', produkRoutes);
app.use('/api/pesanan', pesananRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
