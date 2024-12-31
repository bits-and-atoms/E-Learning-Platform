const express = require('express');
const { coursemodel, validatecourse } = require('../models/coursesmodel');
const { categorymodel } = require('../models/categoriesmodel')
const router = express.Router();
//we got this router and this can be associated to all routes

router.get('/', async (req, res) => {
    let courses = await coursemodel.find();
    res.send(courses);
});

router.post('/', async (req, res) => {
    const { error } = validatedata(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const cat = await categorymodel.findById(req.body.categoryid);
    if (!cat) return res.status(400).send('Invalid ID');

    let course = new coursemodel({
        title: req.body.title,
        category: {
            _id: cat._id,
            name: cat.name
        },
        creator: req.body.creator,
        rating: req.body.rating
    });
    await course.save();
    res.send(course)
});

router.put('/:id', async (req, res) => {
    const { error } = validatedata(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const cat = await categorymodel.findById(req.body.categoryid);
    if (!cat) return res.status(400).send('Invalid ID');
    const course = await coursemodel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: {
            _id: cat._id,
            name: cat.name
        },
        creator: req.body.creator,
        rating: req.body.rating
    }, { new: true })
    //The { new: true } option in the findByIdAndUpdate method of Mongoose specifies that the query should return the updated document instead of the original document.

    if (!course) {
        return res.status(404).send('the course with the given id was not found');
    }
    res.send(course);
});

router.delete('/:id', async (req, res) => {
    const course = await coursemodel.findByIdAndDelete(req.params.id)
    if (!course) {
        return res.status(404).send('the course with the given id was not found');
    }
    res.send(course);
});

router.get('/:id', async (req, res) => {
    const course = await coursemodel.findById(req.params.id)
    if (!course) return res.status(404).send('the course with given id was not found');
    res.send(course);
});

module.exports = router