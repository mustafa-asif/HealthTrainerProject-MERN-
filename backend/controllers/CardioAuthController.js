const {Users,Cardio} = require("../models/index");

// Function to create a new cardio workout
exports.createCardio = async (req, res) => {

  try {
    // Check if the user is authenticated
    console.log("User ID from token:", req.users);
  const { workoutType, cardioName, date, duration, distance, caloriesBurned } = req.body;
  const userID = req.users.id; // Assuming you have user ID from the token

    const newCardio = await Cardio.create({
      workoutType,
      cardioName,
      date,
      duration,
      distance,
      caloriesBurned,
      userID
    });
    // Save the new cardio workout to the database
    console.log("cardio workout created:", newCardio);

    res.status(201).json({ message: "Cardio workout created successfully", newCardio });
  } catch (err) {
    console.log("Error creating cardio workout:", err);
    res.status(500).json({ error: "Server error" });
  }
};


