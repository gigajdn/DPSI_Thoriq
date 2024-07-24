const { collectionRef } = require('../config/firebaseConfig');
const bcrypt = require('bcryptjs');

class Akun {
  constructor({ id_akun, username, password, email, role }) {
    this.id_akun = id_akun;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }

  static async addAkun(akunData) {
    try {
      const hashedPassword = await bcrypt.hash(akunData.password, 10);
      const akun = new Akun({ ...akunData, password: hashedPassword });
      const newAkun = await collectionRef.doc('akun').collection('data').add({ ...akun });
      return newAkun.id;
    } catch (error) {
      throw new Error('Error adding akun: ' + error.message);
    }
  }

  static async getAkunById(id) {
    try {
      const snapshot = await collectionRef.doc('akun').collection('data').where('id_akun', '==', id).get();
      if (snapshot.empty) {
        throw new Error('Akun not found');
      }
      return new Akun(snapshot.docs[0].data());
    } catch (error) {
      throw new Error('Error getting akun: ' + error.message);
    }
  }

  static async login(username, password) {
    try {
      const snapshot = await collectionRef.doc('akun').collection('data').where('username', '==', username).get();
      if (snapshot.empty) {
        throw new Error('Invalid username or password');
      }
      const akun = snapshot.docs[0].data();
      const isMatch = await bcrypt.compare(password, akun.password);
      if (!isMatch) {
        throw new Error('Invalid username or password');
      }
      return akun;
    } catch (error) {
      throw new Error('Error logging in: ' + error.message);
    }
  }
}

module.exports = Akun;
