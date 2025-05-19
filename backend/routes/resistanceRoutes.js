//designed routes for resistance

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createResistance } = require('../controllers/ResistanceAuthController');
const authMiddleware = require('../middleware/authMiddleware');
// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to create a new resistance workout
router.post('/create', authMiddleware, upload.single('image'), createResistance);

module.exports = router;