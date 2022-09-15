const express = require('express');
const Workout = require('../models/workoutModel')
const { createWorkout, getWorkout, getSingleWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');

const router = express.Router();

// get all workouts
router.get('/',getWorkout)


// get a single workout
router.get('/:id',getSingleWorkout)

// post new workout

router.post('/',createWorkout)

// delete workout

router.delete('/:id',deleteWorkout)

// update workout

router.patch('/:id',updateWorkout)

module.exports = router;