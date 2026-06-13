const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/Booking');

// Local in-memory store fallback when DB is offline
const localBookings = [];

// @route   POST api/bookings
// @desc    Submit a new booking inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, eventDate, eventType, guests, location, message } = req.body;
    
    if (!name || !email || !phone || !eventDate || !eventType || !location) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const bookingData = {
      name,
      email,
      phone,
      eventDate,
      eventType,
      guests: guests || 0,
      location,
      message,
      createdAt: new Date()
    };

    // Check if MongoDB is connected (readyState === 1)
    if (mongoose.connection.readyState === 1) {
      const newBooking = new Booking(bookingData);
      const savedBooking = await newBooking.save();
      res.status(201).json({ success: true, data: savedBooking, source: 'database' });
    } else {
      // Offline fallback
      localBookings.push(bookingData);
      console.log('Saved booking to local memory fallback:', bookingData);
      res.status(201).json({ success: true, data: bookingData, source: 'memory' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/bookings
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const bookings = await Booking.find().sort({ eventDate: 1 });
      res.json(bookings);
    } else {
      res.json(localBookings);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
