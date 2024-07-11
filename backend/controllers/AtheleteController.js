const AthleteModel = require('../models/Athlete');
const router = require('express').Router();

const updatePrivacy = async (req, res) => {
    try {
        const updatedData  = req.body.privacy
        if(!updatedData) return res.status(400).send('Data to update can not be empty!')
        const id = req.params.id    

        // const coach = await CoachModel.findByIdAndUpdate(id , updatedData, { new : true } ) 

        const athelete = await AthleteModel.findById(id)
        athelete.privacy = updatedData
        await athelete.save()

        res.json(athelete)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const getCoaches = async (req, res) => {
    try {
        const athelete = await AthleteModel.findById(req.params.id)
        res.json(athelete.coaches)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateWorkoutes = async (atheleteId,workoutId) => {
    try {
        const athelete = await AthleteModel.findById(atheleteId)
        athelete.workoutes.push(workoutId)
        await athelete.save()
        console.log('workout added successfully')
    } catch (error) {
        console.log(error.message)   
    }
} 

module.exports = { updatePrivacy, updateWorkoutes,  getCoaches ,updateWorkoutes}