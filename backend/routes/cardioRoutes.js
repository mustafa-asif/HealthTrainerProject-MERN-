const express = require('express');
const router = express.Router();
const { createCardio } = require('../controllers/CardioAuthController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new cardio workout
router.post('/create',authMiddleware, createCardio);
// router.post('/user/register/cardio/create', createCardio);
// Route to get all cardio workouts 

module.exports = router;
