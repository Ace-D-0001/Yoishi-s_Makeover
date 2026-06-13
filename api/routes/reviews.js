const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');

// Mock data to seed if DB is empty or offline
const defaultReviews = [
  {
    name: 'Sultana Rahman',
    rating: 5,
    reviewText: "Yoishi made me look and feel like a real princess on my wedding day! Her attention to detail and ability to enhance my natural features was perfect. I received so many compliments on my makeup!",
    weddingDate: 'December 2025',
    eventType: 'Bridal'
  },
  {
    name: 'Mehnaz Kabir',
    rating: 5,
    reviewText: "Highly professional and punctual. The airbrush makeup stayed flawless for over 12 hours despite the humid weather. Thank you Yoishi's Makeover!",
    weddingDate: 'January 2026',
    eventType: 'Reception'
  },
  {
    name: 'Anika Bushra',
    rating: 5,
    reviewText: "I was extremely nervous about my bridal makeup, but Yoishi listened to exactly what I wanted. The soft-glam look was stunning. Recommend her to every bride-to-be!",
    weddingDate: 'November 2025',
    eventType: 'Holud / Mehendi'
  },
  {
    name: 'Nuzhat Ara',
    rating: 5,
    reviewText: "Excellent experience. She did makeup for me and my sister. Super clean and hygienic products used. Loved the glowy finish!",
    weddingDate: 'March 2026',
    eventType: 'Engagement'
  }
];

let localReviews = [...defaultReviews];

// @route   GET api/reviews
// @desc    Get all reviews (or seed if empty / use local fallback)
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let reviews = await Review.find().sort({ createdAt: -1 });
      if (reviews.length === 0) {
        reviews = await Review.insertMany(defaultReviews);
      }
      res.json(reviews);
    } else {
      res.json(localReviews);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/reviews
// @desc    Add a new review
router.post('/', async (req, res) => {
  try {
    const { name, rating, reviewText, weddingDate, eventType } = req.body;
    if (!name || !rating || !reviewText) {
      return res.status(400).json({ message: 'Name, rating and review text are required' });
    }
    
    const reviewData = {
      name,
      rating,
      reviewText,
      weddingDate,
      eventType: eventType || 'Bridal',
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const newReview = new Review(reviewData);
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } else {
      localReviews.unshift(reviewData);
      res.status(201).json(reviewData);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
