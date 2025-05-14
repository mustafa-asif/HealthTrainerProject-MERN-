const express = require('express');
const router = express.Router();
const { createCardio,getCardioWorkouts } = require('../controllers/CardioAuthController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new cardio workout
router.post('/create',authMiddleware, createCardio);

// Route to get all cardio workouts for a user
router.get('/all', authMiddleware, getCardioWorkouts);


module.exports = router;
