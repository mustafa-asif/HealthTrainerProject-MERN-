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

// Function to get all resistance workouts for a user
exports.getAllResistance = async (req, res) => {
  try {
    const userID = req.users.id; // Assuming you have user ID from the token
    const resistanceWorkouts = await Resistance.find({ userID }).sort({ date: -1 });

    res.status(200).json(resistanceWorkouts);
  } catch (err) {
    console.log("Error fetching resistance workouts:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// fuction to update a resistance workout
exports.updateResistance = async (req, res) => {
  try {
    const resistanceId = req.params.id;
    const { workoutType, resistanceName, date, sets, reps, weightUsed, caloriesBurned } = req.body;
    const userID = req.users.id; // Assuming you have user ID from the token
    let imageUrl, publicId='';

    // Check if the resistance workout exists
    const resistanceWorkout = await Resistance.findById(resistanceId);
    if (!resistanceWorkout) {
      return res.status(404).json({ error: "Resistance workout not found" });
    }

    // Update image if provided
    if (req.file) {
      // Delete old image from Cloudinary
      if (resistanceWorkout.publicId) {
        await cloudinary.uploader.destroy(resistanceWorkout.publicId);
      }
      const uploadStream = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
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
    } else {
      imageUrl = resistanceWorkout.imageUrl; // Keep old image if no new one is provided
      publicId = resistanceWorkout.publicId;
    }

    // Update the resistance workout
    const updatedResistance = await Resistance.findByIdAndUpdate(
      resistanceId,
      {
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
      },
      { new: true }
    );

    res.status(200).json({ message: "Resistance workout updated successfully", updatedResistance });
  } catch (err) {
    console.log("Error updating resistance workout:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Function to delete a cardio workout
exports.deleteResistance = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.users.id; // Assuming you have user ID from the token

    // Find the cardio workout by ID and userID
    const resistanceWorkout = await Resistance.findOne({ _id: id, userID });

    if (!resistanceWorkout) {
      return res.status(404).json({ error: "Resistance workout not found" });
    }

    // Delete the image from Cloudinary
    if (resistanceWorkout.publicId) {
      await cloudinary.uploader.destroy(resistanceWorkout.publicId);
    }

    // Delete the cardio workout from the database
    await Resistance.deleteOne({ _id: id });

    res.status(200).json({ message: "Resistance workout deleted successfully" });
  } catch (err) {
    console.log("Error deleting Resistance workout:", err);
    res.status(500).json({ error: "Server error" });
  }
};
