const Joi = require('joi');
const mongoose = require('mongoose')
const {categoryschema} =require('../models/categoriesmodel')
const courseschema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 5, maxlength: 255 },
    category: {type: categoryschema, required:true},
    creator: { type: String, required: true, minlength: 5 },
    rating: { type: Number, required: true }
})
//trim makes sure, trying to save strings like "  hello", or "hello ", or "  hello ", would end up being saved as "hello"

const coursemodel = mongoose.model('coursemodel', courseschema);

function validatecourse(course) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        categoryid: Joi.string().required(),
        creator: Joi.string().required().min(5),
        rating: Joi.number().required().min(0)
    })
    return schema.validate(category)
}

exports.coursemodel = coursemodel
exports.validatecourse = validatecourse