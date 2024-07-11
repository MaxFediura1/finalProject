const { workoutValidation } = require('../validation');
const WorkoutModel = require('../models/Workout');
const {updateWorkoutes: updateCoachWorkouts} = require('../controllers/CoachController');
const {updateWorkoutes: updateAtheleteWorkouts} = require('../controllers/AtheleteController');
const Workout = require('../models/Workout');

const createWorkout = async (req, res) => {
    try {

        const { error } = workoutValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);


        const workout = new WorkoutModel({
            sportType: req.body.sportType,
            difficulty: req.body.difficulty,
            duration: req.body.duration,
            date: req.body.date,
            coach: req.body.coach,
            athlete: req.body.athlete
        });

        const savedWorkout = await workout.save();

        updateCoachWorkouts(req.body.coach, savedWorkout._id);

        updateAtheleteWorkouts(req.body.athlete, savedWorkout._id);

        res.json({
            message: "Workout created successfully",
            savedWorkout
        }); 
    } catch (error) {
    res.status(400).send(error.message);
    }
}

const getAll = async (req, res) => {
    try {
    const allWorkouts = await WorkoutModel.find();
    res.json(allWorkouts);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const sportTypeFilter = async (req, res) => {
    try {
    const allWorkouts = await WorkoutModel.find({sportType: req.body.sportType});
    res.json(allWorkouts);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const difficultyFilter = async (req, res) => {
    try{
        const allWorkouts = await WorkoutModel.find({difficulty: req.body.difficulty});
        // allWorkouts.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
        res.json(allWorkouts);
    } catch(error){
        res.status(400).send(error.message);
    }
}
const durationFilter = async (req, res) => {
    try{
        const allWorkouts = await WorkoutModel.find({duration: req.body.duration});
        // allWorkouts.sort((a, b) => a.duration.localeCompare(b.duration));
        res.json(allWorkouts);
    } catch(error){
        res.status(400).send(error.message);
    }
}
const dateFilter = async (req, res) => {
    try{
        const allWorkouts = await WorkoutModel.find({date: req.body.date});
        // allWorkouts.sort((a, b) => a.date - b.date);
        res.json(allWorkouts);
    } catch(error){
        res.status(400).send(error.message);
    }
}
const coachFilter = async (req, res) => {
    try{
        const workout = await WorkoutModel.find({coach: req.params.coach});
        res.json(workout);
    } catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = { createWorkout , getAll, sportTypeFilter, difficultyFilter, durationFilter, dateFilter, coachFilter }

