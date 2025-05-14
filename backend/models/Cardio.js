const {Schema, model} = require('mongoose');

// Define the cardio schema
const cardioSchema = new Schema({
  workoutType: {
    type: String,
    default: 'Cardio',
    required: true
  },
  cardioName:{
    type:String,
    required:true,
    maxlength: 40
  },
 
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  userID:{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
}, { timestamps: true }
);

// Create the Cardio model
const Cardio = model('Cardio', cardioSchema);
module.exports = Cardio;