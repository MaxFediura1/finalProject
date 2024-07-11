const CoachModel = require('../models/Coach');


const updatePrivacy = async (req, res) => {
    try {
        const updatedData  = req.body.privacy
        if(!updatedData) return res.status(400).send('Data to update can not be empty!')
        const id = req.params.id    

        // const coach = await CoachModel.findByIdAndUpdate(id , updatedData, { new : true } ) 

        const coach = await CoachModel.findById(id)
        coach.privacy = updatedData
        await coach.save()

        res.json(coach)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const updateSportList = async (req, res) => {
    try {
        const updatedData  = req.body.sportTypes
        if(!updatedData) return res.status(400).send('Data to update can not be empty!')
        const id = req.params.id    

        // const coach = await CoachModel.findByIdAndUpdate(id , updatedData, { new : true } ) 

        const coach = await CoachModel.findById(id)
        coach.sportTypes = updatedData
        await coach.save()

        res.json(coach)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateWorkoutes = async (coachId,workoutId) => {
    try {
        const coach = await CoachModel.findById(coachId)
        coach.workoutList.push(workoutId)
        await coach.save()
        console.log('workout added successfully')
    } catch (error) {
        console.log(error.message)   
    }
}

const getAtheltes = async (req, res) => {
    try {
        const coach = await CoachModel.findById(req.params.id)
        res.json(coach.athletes)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllCoaches = async (req, res) => {
    try {
        const coach = await CoachModel.find()
        res.json(coach)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = { updatePrivacy, updateSportList, getAtheltes, updateWorkoutes, getAllCoaches }