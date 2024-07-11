const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    sportType: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
        required: true
    },
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true
    }
}, { timestamps: true
 });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout
 