// config/firebaseConfig.js

const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Mendapatkan service account dari variabel lingkungan
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://your-database-name.firebaseio.com" // Ganti dengan URL database Firebase Anda
});

const db = admin.firestore();
const collectionRef = db.collection('thoriq');

module.exports = { db, collectionRef };

