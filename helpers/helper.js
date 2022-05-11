const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const registrationValidator = (data) => {

     const schema = Joi.object({
          name: Joi.string().min(3).max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string().required()
     })
     return schema.validate(data)
}

const loginValidator = (data) => {

     const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
     })
    
     return schema.validate(data)
}

module.exports = { registrationValidator, loginValidator }