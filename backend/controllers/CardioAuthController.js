const {Users,Cardio} = require("../models/index");
const cloudinary = require('../utils/cloudinary');

// Function to create a new cardio workout
exports.createCardio = async (req, res) => {

  try {
    // Check if the user is authenticated
    console.log("User ID from token:", req.users);
  const { workoutType, cardioName, date, duration, distance, caloriesBurned } = req.body;
  const userID = req.users.id; // Assuming you have user ID from the token
  let imageUrl, publicId='';

  // check if image is uploaded
  if (req.file) {
    const uploadStream = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resourse_type:"image" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });
    imageUrl = uploadStream.secure_url;
    publicId = uploadStream.public_id;
  }
// create a new cardio workout
    const newCardio = await Cardio.create({
      workoutType,
      cardioName,
      date,
      duration,
      distance,
      caloriesBurned,
      userID,
      imageUrl,
      publicId
    });
    // Save the new cardio workout to the database
    console.log("cardio workout created:", newCardio);

    res.status(201).json({ message: "Cardio workout created successfully", newCardio });
  } catch (err) {
    console.log("Error creating cardio workout:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Function to get all cardio workouts for a user
exports.getCardioWorkouts = async (req, res) => {
  try {
    const userID = req.users.id; // Assuming you have user ID from the token
    const cardioWorkouts = await Cardio.find({ userID }).sort({ date: -1 });

    res.status(200).json(cardioWorkouts);
  } catch (err) {
    console.log("Error fetching cardio workouts:", err);
    res.status(500).json({ error: "Server error" });
  }
}


