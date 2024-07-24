const { collectionRef } = require('../config/firebaseConfig');

class Produk {
  constructor({ id_produk, nama_produk, deskripsi, harga_produk, stok_produk, id_akun }) {
    this.id_produk = id_produk;
    this.nama_produk = nama_produk;
    this.deskripsi = deskripsi;
    this.harga_produk = harga_produk;
    this.stok_produk = stok_produk;
    this.id_akun = id_akun;
  }

  static async addProduk(produkData) {
    try {
      const produk = new Produk(produkData);
      const newProduk = await collectionRef.doc('produk').collection('data').add({ ...produk });
      return newProduk.id;
    } catch (error) {
      throw new Error('Error adding produk: ' + error.message);
    }
  }

  static async getProdukById(id) {
    try {
      const doc = await collectionRef.doc('produk').collection('data').doc(id).get();
      if (!doc.exists) {
        throw new Error('Produk not found');
      }
      return new Produk(doc.data());
    } catch (error) {
      throw new Error('Error getting produk: ' + error.message);
    }
  }

  static async updateProduk(id, updatedData) {
    try {
      await collectionRef.doc('produk').collection('data').doc(id).update(updatedData);
      return `Produk with ID: ${id} updated successfully`;
    } catch (error) {
      throw new Error('Error updating produk: ' + error.message);
    }
  }

  static async deleteProduk(id) {
    try {
      await collectionRef.doc('produk').collection('data').doc(id).delete();
      return `Produk with ID: ${id} deleted successfully`;
    } catch (error) {
      throw new Error('Error deleting produk: ' + error.message);
    }
  }
}

module.exports = Produk;
