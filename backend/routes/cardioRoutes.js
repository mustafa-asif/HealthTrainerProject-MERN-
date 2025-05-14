const express = require('express');
const router = express.Router();
const { createCardio } = require('../controllers/CardioAuthController');

// Route to create a new cardio workout
router.post('/user/login/cardio/create', createCardio);
router.post('/user/register/cardio/create', createCardio);
// Route to get all cardio workouts 

module.exports = router;
