// routes/subscribeRoutes.js
const express = require('express');
const router = express.Router();
const Subscribe = require('../models/Subscribe');

router.post('/create', async (req, res) => {
  try {
    const subs = new Subscribe(req.body);
    await subs.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const subs = await Subscribe.findById(req.params.id);
        res.render('subEdit', { subs });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});

// Update a reservation (POST request to update the record)
router.post('/edit/:id', async (req, res) => {
  try {
    const { 
        email,
        status
     } = req.body;
    await Subscribe.findByIdAndUpdate(req.params.id, { email, status });
    res.redirect('/subscribe');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Delete a subs
router.delete('/delete/:id', async (req, res) => {
  try {
    const subsId = req.params.id;
    await Subscribe.findOneAndRemove({ _id: subsId }); // Use findOneAndRemove
    res.redirect('/subscribe');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Show subscribed subscribers
router.get('/subscribed', async (req, res) => {
  try {
    const subs = await Subscribe.find({ status: 'subscribed' });
    const totalsub = await Subscribe.find()
    const subscribed = await Subscribe.find({ status: 'subscribed' });
    const unsubscribed = await Subscribe.find({ status: 'unsubscribed' });
    const len = totalsub.length;
    const slen = subscribed.length;
    const unslen = unsubscribed.length;
    if (subs.length === 0) {
      res.send('No subscribed subscribers found.');
    } else {
      res.render('subscribe', { subs, len, slen, unslen });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Show unsubscribed subscribers
router.get('/unsubscribed', async (req, res) => {
  try {
    const subs = await Subscribe.find({ status: 'unsubscribed' });
    const totalsub = await Subscribe.find()
    const subscribed = await Subscribe.find({ status: 'subscribed' });
    const unsubscribed = await Subscribe.find({ status: 'unsubscribed' });
    const len = totalsub.length;
    const slen = subscribed.length;
    const unslen = unsubscribed.length;
    if (subs.length === 0) {
      res.send('No unsubscribed subscribers found.');
    } else {
      res.render('subscribe', { subs, len, slen, unslen });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

// Show all subs (Read)
router.get('/', async (req, res) => {
    try {
        const subs = await Subscribe.find();
        const subscribed = await Subscribe.find({ status: 'subscribed' });
        const unsubscribed = await Subscribe.find({ status: 'unsubscribed' });
        const len = subs.length;
        const slen = subscribed.length;
        const unslen = unsubscribed.length;
        if (subs.length === 0) {
            res.send('No subs found.'); // Handle the case of no subs
        } else {
            res.render('subscribe', { subs, len, slen, unslen });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});

module.exports = router;