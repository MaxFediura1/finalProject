const { required } = require('joi');
const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
    privacy: {
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
        }
    },

    
    workoutes: {
        type: Array,
        default: [],
    },

    coachList: {
        type: Array,
        default: [],
    }
}, { timestamps: true
 });

const Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete
 