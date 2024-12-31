const Joi = require('joi');
const mongoose = require('mongoose')

const studentschema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 300 },
    isenrolled: { type: Boolean, default: false },
    phone: { type: String, required: true, minlength: 10, maxlength: 25 }
})

const studentmodel = mongoose.model('studentmodel', studentschema);

function validatedata(student) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(300).required(),
        isenrolled: Joi.boolean(),
        phone: Joi.string().required().min(10).max(25)
    })
    return schema.validate(student)
}

exports.studentmodel = studentmodel
exports.validatedata = validatedata