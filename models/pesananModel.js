const { collectionRef } = require('../config/firebaseConfig');

class Pesanan {
  constructor({ id_pesanan, id_akun, id_produk, kuantitas, totalHarga, kartuKredit, pengirim }) {
    this.id_pesanan = id_pesanan;
    this.id_akun = id_akun;
    this.id_produk = id_produk;
    this.kuantitas = kuantitas;
    this.totalHarga = totalHarga;
    this.kartuKredit = kartuKredit;
    this.pengirim = pengirim;
  }

  static async addPesanan(pesananData) {
    try {
      const pesanan = new Pesanan(pesananData);
      const newPesanan = await collectionRef.doc('pesanan').collection('data').add({ ...pesanan });
      return newPesanan.id;
    } catch (error) {
      throw new Error('Error adding pesanan: ' + error.message);
    }
  }

  static async getPesananById(id) {
    try {
      const doc = await collectionRef.doc('pesanan').collection('data').doc(id).get();
      if (!doc.exists) {
        throw new Error('Pesanan not found');
      }
      return new Pesanan(doc.data());
    } catch (error) {
      throw new Error('Error getting pesanan: ' + error.message);
    }
  }
}

module.exports = Pesanan;
