const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const AuthModel = require('../models/Auth');
const CoachModel = require('../models/Coach');
const AthleteModel = require('../models/Athlete');
const { athleteValidation, coachValidation } = require('../validation');
const { sendEmail } = require('../view/index');

const register = async (req, res) => {
    try {

        const {profileData, auth} = req.body
        const { role , password } = auth
        // console.log(profileData.privacy)

        const { error } = (role === "coach") ? coachValidation(profileData) : athleteValidation(profileData);
        if (error) return res.status(400).send(error.details[0].message);


        // const emailUser = await AuthModel.findOne({ email: profileData.privacy.email });
        // if (!emailUser) return res.status(400).send('Email already exists');
        // if(!AuthModel.findOne({ email: profileData.privacy.email })) return res.status(400).send('Email already exists');

        const user = role === "coach" ? new CoachModel({
            privacy: {   
            fullName: profileData.privacy.fullName,
            age: profileData.privacy.age,
            gender: profileData.privacy.gender,
            email: profileData.privacy.email,
            experience: profileData.privacy.experience,
            },
            sportTypes: profileData.sportTypes
        }) : new AthleteModel({
            privacy: {
                fullName: profileData.privacy.fullName,
                age: profileData.privacy.age,
                gender: profileData.privacy.gender,
                email: profileData.privacy.email,
            }
        });

        const savedUser = await user.save();

        const token = jwt.sign(
            {
                _id: savedUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        );


        const id  = savedUser._id
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const email = savedUser.privacy.email

        const authUser = role === "coach" ? new AuthModel({ email:email,password:hashPassword,role: role,token:token, coachId: id }) : new AuthModel({ email:email,password:hashPassword,role: role,token:token, athleteId: id });

        const savedAuth = await authUser.save();
        const authToken = jwt.sign(
            {
                _id: savedUser._id,

            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        );
        res.json({
                    savedAuth,
                    authToken,

                    savedUser,
                    token

   
        });
        sendEmail( profileData.privacy.fullName,email)
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const authUser = await AuthModel.findOne({ email: email });
        if (!authUser) return res.status(400).send('Invalid email');
        const validPassword = await bcrypt.compare(password, authUser.password);
        if (!validPassword) return res.status(400).send('Invalid password');


        const user = authUser.role === "coach" ? await CoachModel.findById(authUser.coachId) : await AthleteModel.findById(authUser.coachId);
        console.log(user)
        // console.log(user)
    
        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        );
        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = { register, login }