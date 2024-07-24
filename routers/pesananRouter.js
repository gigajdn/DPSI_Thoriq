const express = require('express');
const router = express.Router();
const pesananController = require('../controllers/pesananController');
const auth = require('../middleware/authMiddleware');

//auth()hanya mengecek apakah pengguna sudah melakukan aktifitas login atau belum
//auth(Pembeli) akan melakukan pengecekan lebih dengan pengecekan pada role apakah pengguna memiliki role sebagai Pembeli
router.post('/', auth('Pembeli'), pesananController.addPesanan);
router.get('/:id', auth(), pesananController.getPesananById);

module.exports = router;
