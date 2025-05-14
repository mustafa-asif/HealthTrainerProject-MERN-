const {Users,Cardio} = require("../models/index");

// Function to create a new cardio workout
exports.createCardio = async (req, res) => {
  const { workoutType, cardioName, date, duration, distance, caloriesBurned } = req.body;
  const userID = req.Users._id // Assuming you have user ID from the token

  try {
    const newCardio = await Cardio.create({
      workoutType,
      cardioName,
      date,
      duration,
      distance,
      caloriesBurned,
      userID
    });

    res.status(201).json({ message: "Cardio workout created successfully", newCardio });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


