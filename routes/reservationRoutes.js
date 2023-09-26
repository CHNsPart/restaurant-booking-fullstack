// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Subscribe = require('../models/Subscribe');

// Add a new reservation (Create)
router.post('/reservations', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Update a reservation (GET request to load the edit form)
router.get('/reservations/edit/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.render('edit', { reservation });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Update a reservation (POST request to update the record)
router.post('/reservations/edit/:id', async (req, res) => {
  try {
    const { name, phone, person, reservationDate, reservationTime, message } = req.body;
    await Reservation.findByIdAndUpdate(req.params.id, { name, phone, person, reservationDate, reservationTime, message });
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});



// Delete a reservation
router.delete('/reservations/delete/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;
    await Reservation.findOneAndRemove({ _id: reservationId }); // Use findOneAndRemove
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Show all reservations (Read)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('index', { reservations });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

router.get('/admin', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    const subs = await Subscribe.find();
    const reservationLength = reservations.length;
    const subsLength = subs.length
    if (reservations.length === 0) {
      res.send('No reservations found.'); // Handle the case of no reservations
    } else {
      res.render('admin', { reservations, subsLength, reservationLength });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred: ' + error.message);
  }
});


// More routes for updating and deleting records can be added here

module.exports = router;
