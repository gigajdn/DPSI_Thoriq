const Akun = require('../models/akunModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { id_akun, username, password, email, role } = req.body;
  try {
    const akunId = await Akun.addAkun({ id_akun, username, password, email, role });
    res.status(201).send(`Akun created with ID: ${akunId}`);
  } catch (error) {
    res.status(400).send('Error creating akun: ' + error.message);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const akun = await Akun.login(username, password);
    const token = jwt.sign({ id_akun: akun.id_akun, role: akun.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).send('Error logging in: ' + error.message);
  }
};

exports.getAkunById = async (req, res) => {
  const { id } = req.params;
  try {
    const akun = await Akun.getAkunById(id);
    res.status(200).json(akun);
  } catch (error) {
    res.status(404).send('Error getting akun: ' + error.message);
  }
};
