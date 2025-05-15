const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createCardio,getCardioWorkouts,deleteCardio,updateCardio } = require('../controllers/CardioAuthController');
const authMiddleware = require('../middleware/authMiddleware');


// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Route to create a new cardio workout
router.post('/create',authMiddleware,upload.single('image'), createCardio);

// Route to get all cardio workouts for a user
router.get('/all', authMiddleware, getCardioWorkouts);

// Route to delete a cardio workout
router.delete('/delete/:id', authMiddleware, deleteCardio);
// Route to update a cardio workout
router.put('/update/:id', authMiddleware, upload.single('image'), updateCardio);


module.exports = router;
