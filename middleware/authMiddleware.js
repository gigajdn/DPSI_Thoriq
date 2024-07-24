const jwt = require('jsonwebtoken');
const { collectionRef } = require('../config/firebaseConfig');

const auth = (requiredRole) => async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const akunSnapshot = await collectionRef.doc('akun').collection('data').where('id_akun', '==', decoded.id_akun).get();

    if (akunSnapshot.empty) {
      return res.status(401).send('Access denied. Invalid token.');
    }

    const akun = akunSnapshot.docs[0].data();
    
    if (requiredRole && akun.role !== requiredRole) {
      return res.status(403).send('Access denied. You do not have the required role.');
    }

    req.akun = akun;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = auth;
