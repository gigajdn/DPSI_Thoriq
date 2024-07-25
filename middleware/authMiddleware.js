require('dotenv').config();
const jwt = require('jsonwebtoken');
const { collectionRef } = require('../config/firebaseConfig');

const auth = (requiredRole) => async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No token provided or improperly formatted token');
      return res.status(401).send('Access denied. No token provided.');
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    const akunSnapshot = await collectionRef
      .doc('akun')
      .collection('data')
      .where('id_akun', '==', decoded.id_akun)
      .get();
    console.log('Akun snapshot size:', akunSnapshot.size);

    if (akunSnapshot.empty) {
      console.error('Invalid token. No matching account found.');
      return res.status(401).send('Access denied. Invalid token.');
    }

    const akun = akunSnapshot.docs[0].data();
    console.log('Akun data:', akun);

    if (requiredRole && akun.role !== requiredRole) {
      console.error(`Access denied. Required role: ${requiredRole}, User role: ${akun.role}`);
      return res.status(403).send('Access denied. You do not have the required role.');
    }

    req.akun = akun;
    next();
  } catch (error) {
    console.error('Error verifying token or retrieving account:', error);
    res.status(400).send('Invalid token.');
  }
};

module.exports = auth;
