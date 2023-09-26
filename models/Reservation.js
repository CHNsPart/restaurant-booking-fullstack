// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  person: String,
  reservationDate: Date,
  reservationTime: String,
  message: String,
});

module.exports = mongoose.model('Reservation', reservationSchema);
