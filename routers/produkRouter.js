const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');
const auth = require('../middleware/authMiddleware');

//auth()hanya mengecek apakah pengguna sudah melakukan aktifitas login atau belum
//auth(Pembeli) akan melakukan pengecekan lebih dengan pengecekan pada role apakah pengguna memiliki role sebagai Penjual
router.post('/', auth('Penjual'), produkController.addProduk);
router.get('/:id', auth(), produkController.getProdukById);
router.put('/:id', auth('Penjual'), produkController.updateProduk);
router.delete('/:id', auth('Penjual'), produkController.deleteProduk);

module.exports = router;
