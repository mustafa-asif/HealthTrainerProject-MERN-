const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;

let userRoutes = express.Router();

//1 retrieve all users
userRoutes.route('/users').get(async(req, res) => {
  try {
    const db = database.getDatabse();
    const collection = await db.collection('usersDetails').find({}).toArray();
    if(collection.length > 0) {
      res.status(200).json(collection);
    }
    else {
      res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//2 retrieve a user by id
userRoutes.route('/users/:id').get(async(req, res) => {
  try {
    const db = database.getDatabse();
    const userId = req.params.id;
    const collection = await db.collection('usersDetails').findOne({ _id: ObjectId(userId) });
    if(Object.keys(collection).length > 0) {
      res.status(200).json(collection);
    }
    else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});