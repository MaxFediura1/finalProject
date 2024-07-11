const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        enum: ["coach", "athlete"],
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }, 
    coachId: {
        type: Array,
        ref: 'coach',
        default:[],
        required: true,
      },
    athleteId: {
        type: Array,
        ref: 'athlete',
        default: [],    
    }


}, { timestamps: true
 });

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth