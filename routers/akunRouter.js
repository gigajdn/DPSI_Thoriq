const express = require('express');
const router = express.Router();
const akunController = require('../controllers/akunController');
const auth = require('../middleware/authMiddleware');

//auth()hanya mengecek apakah pengguna sudah melakukan aktifitas login atau belum
router.post('/register', akunController.register);
router.post('/login', akunController.login);
router.get('/:id', auth(), akunController.getAkunById);

module.exports = router;
