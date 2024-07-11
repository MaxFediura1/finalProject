require('dotenv').config()
const express = require("express");
const PORT = 3000;
const app = express();
const mongoose = require("mongoose");
const AuthController = require("./controllers/AuthController");
const CoachConteroller = require('./controllers/CoachController');
const WorkoutController = require('./controllers/WorkoutController');


mongoose
    .connect('mongodb+srv://maxfediura:w05hJjT9ZGaR92RM@clusterfs.swgio5y.mongodb.net/trainingWeb?retryWrites=true&w=majority')
    .then(() => {console.log('Connected to MongoDB')})
    .catch((err) => {console.log(err)});


app.use(express.json());

app.set('view engine', 'hbs');

app.post("/register", AuthController.register);

app.post('/login', AuthController.login)

// app.get('/getMe', LoginController.getMe)

app.patch('/coach/updateData/:id', CoachConteroller.updatePrivacy)

app.post('/createWorkout', WorkoutController.createWorkout)


// app.post('/sendEmail',sendEmail)



app.get('/difficulty',WorkoutController.difficultyFilter)

app.get('/sportType',WorkoutController.sportTypeFilter)

app.get('/date',WorkoutController.dateFilter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})