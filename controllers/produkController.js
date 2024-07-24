const Produk = require('../models/produkModel');

exports.addProduk = async (req, res) => {
  const { id_produk, nama_produk, deskripsi, harga_produk, stok_produk, id_akun } = req.body;
  try {
    const produkId = await Produk.addProduk({ id_produk, nama_produk, deskripsi, harga_produk, stok_produk, id_akun });
    res.status(201).send(`Produk created with ID: ${produkId}`);
  } catch (error) {
    res.status(400).send('Error creating produk: ' + error.message);
  }
};

exports.getProdukById = async (req, res) => {
  const { id } = req.params;
  try {
    const produk = await Produk.getProdukById(id);
    res.status(200).json(produk);
  } catch (error) {
    res.status(404).send('Error getting produk: ' + error.message);
  }
};

exports.updateProduk = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const message = await Produk.updateProduk(id, updatedData);
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send('Error updating produk: ' + error.message);
  }
};

exports.deleteProduk = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Produk.deleteProduk(id);
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send('Error deleting produk: ' + error.message);
  }
};
