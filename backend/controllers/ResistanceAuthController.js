const {Resistance}= require('../models/index');

const cloudinary = require('../utils/cloudinary');
// Function to create a new resistance workout
 exports.createResistance= async (req, res) => {
  try {
    // Check if the user is authenticated
    console.log("User ID from token:", req.users);
    const { workoutType, resistanceName, date, sets, reps, weightUsed, caloriesBurned } = req.body;
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
  // create a new resistance workout
      const newResistance = await Resistance.create({
        workoutType,
        resistanceName,
        date,
        sets,
        reps,
        weightUsed,
        caloriesBurned,
        userID,
        imageUrl,
        publicId
      });
      // Save the new resistance workout to the database
      console.log("resistance workout created:", newResistance);

      res.status(201).json({ message: "Resistance workout created successfully", newResistance });
    } catch (err) {
      console.log("Error creating resistance workout:", err);
      res.status(500).json({ error: "Server error" });
    }
  };
