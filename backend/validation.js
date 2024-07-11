const Joi = require('joi');


exports.athleteValidation = (data) => {
    const schema = Joi.object({
        privacy: Joi.object({
            fullName: Joi.string()
        .required(),
    
        age: Joi.number()
        .integer()
        .min(18)
        .max(100)
        .required(),

        
        gender: Joi.valid("male", "female")
        .required(),


        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    
        }),

        
        
    })  
    return schema.validate(data)
}
exports.coachValidation = (data) => {
    const schema = Joi.object({
        privacy: Joi.object({

            fullName: Joi.string()
            .required(),
        
            age: Joi.number()
            .integer()
            .min(18)
            .max(100)
            .required(),
        
            gender: Joi.valid("male", "female")
            .required(),
    
    
        
            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),    
    
            
            experience: Joi.string()
            .required(),
        }),


        sportTypes: Joi.array()
        .required(),


    }) 
    return schema.validate(data)
}

exports.workoutValidation = (data) => {
    const schema = Joi.object({
    
        sportType: Joi.string()
        .required(),
    
        difficulty: Joi.string()
        .required(),
    
        duration: Joi.number()
        .required(),    
    
        date: Joi.date()
        .required(),
    
        coach: Joi.string()
        .required(),

        athlete: Joi.string()
        .required(),

    })
    return schema.validate(data)
}