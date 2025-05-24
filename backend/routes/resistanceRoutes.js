//designed routes for resistance

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createResistance,getAllResistance,deleteResistance,updateResistance } = require('../controllers/ResistanceAuthController');
const authMiddleware = require('../middleware/authMiddleware');
// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to create a new resistance workout
router.post('/create', authMiddleware, upload.single('image'), createResistance);
// Route to get all resistance workouts for a user
router.get('/all', authMiddleware, getAllResistance);
// Route to delete a resistance workout
router.delete('/delete/:id', authMiddleware, deleteResistance);
// Route to update a resistance workout
router.put('/update/:id', authMiddleware, upload.single('image'), updateResistance);

module.exports = router;