const Pesanan = require('../models/pesananModel');

exports.addPesanan = async (req, res) => {
  const { id_pesanan, id_akun, id_produk, kuantitas, totalHarga, kartuKredit, pengirim } = req.body;
  try {
    const pesananId = await Pesanan.addPesanan({ id_pesanan, id_akun, id_produk, kuantitas, totalHarga, kartuKredit, pengirim });
    res.status(201).send(`Pesanan created with ID: ${pesananId}`);
  } catch (error) {
    res.status(400).send('Error creating pesanan: ' + error.message);
  }
};

exports.getPesananById = async (req, res) => {
  const { id } = req.params;
  try {
    const pesanan = await Pesanan.getPesananById(id);
    res.status(200).json(pesanan);
  } catch (error) {
    res.status(404).send('Error getting pesanan: ' + error.message);
  }
};
