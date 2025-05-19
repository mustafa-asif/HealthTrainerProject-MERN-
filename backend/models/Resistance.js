const {Schema, model} = require('mongoose');

const resistanceSchema = new Schema({
  workoutType: {
    type: String,
    required: true,
  },
  resistanceName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weightUsed: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    
  },
  publicId: {
    type: String,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Resistance = model('Resistance', resistanceSchema);
module.exports = Resistance;