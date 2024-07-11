const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({

    privacy:
        {
            fullName: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            gender: {
                enum: ['male', 'female'],
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            experience: {
                type: String,
                required: true
            },
        }
    ,
    sportTypes:{
        type: Array,
        required: true
    },
    athleteList: {
        type: Array,
        default: [],
    },
    workoutList: {
        type: Array,
        default: [],
    }

}, { timestamps: true
 });

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach
 