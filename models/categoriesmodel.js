const Joi = require('joi');
const mongoose = require('mongoose')

const categoryschema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 30 }
})

const categorymodel = mongoose.model('categorymodel', categoryschema);

function validatedata(category) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required()
    })
    return schema.validate(category)
}

exports.categorymodel = categorymodel
exports.validatedata = validatedata
exports.categoryschema = categoryschema