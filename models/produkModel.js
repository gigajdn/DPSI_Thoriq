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
      const doc = await collectionRef.doc('produk').collection('data').where('id_produk', '==', id).get();
      if (doc.empty) {
        throw new Error('Produk not found');
      }
      return new Produk(doc.docs[0].data());
    } catch (error) {
      throw new Error('Error getting produk: ' + error.message);
    }
  }

  static async updateProduk(id, updatedData) {
    try {
      console.log('Starting update for produk with ID:', id);

      const querySnapshot = await collectionRef
        .doc('produk')
        .collection('data')
        .where('id_produk', '==', id)
        .get();

      if (querySnapshot.empty) {
        throw new Error(`Produk with ID: ${id} not found`);
      }

      const docRef = querySnapshot.docs[0].ref;
      console.log('Document reference found:', docRef.path);

      await docRef.update(updatedData);
      console.log('Produk updated successfully:', id);

      return `Produk with ID: ${id} updated successfully`;
    } catch (error) {
      console.error('Error updating produk:', error.message);
      throw new Error('Error updating produk: ' + error.message);
    }
  }


  static async deleteProduk(id) {
    try {
      const querySnapshot = await collectionRef
        .doc('produk')
        .collection('data')
        .where('id_produk', '==', id)
        .get();

      if (querySnapshot.empty) {
        throw new Error(`Produk with ID: ${id} not found`);
      }

      const batch = collectionRef.firestore.batch(); // Create a batch for deleting multiple documents
      querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit(); // Commit the batch

      return `Produk with ID: ${id} deleted successfully`;
    } catch (error) {
      throw new Error('Error deleting produk: ' + error.message);
    }
  }
}


module.exports = Produk;
