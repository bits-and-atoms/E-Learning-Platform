const express = require('express');
const {studentmodel,validatedata}=require('../models/studentsmodel')
const router = express.Router();
//we got this router and this can be associated to all routes

router.get('/', async (req, res) => {
    let students = await studentmodel.find();
    res.send(students);
});

router.post('/', async (req, res) => {
    const { error } = validatedata(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const student = new studentmodel({
        name: req.body.name,
        isenrolled: req.body.isenrolled,
        phone: req.body.phone
    });
    await student.save();
    res.send(student)
});

router.put('/:id', async (req, res) => {
    const { error } = validatedata(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const student = await studentmodel.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isenrolled: req.body.isenrolled }, { new: true })
    //The { new: true } option in the findByIdAndUpdate method of Mongoose specifies that the query should return the updated document instead of the original document.

    if (!student) {
        return res.status(404).send('the student with the given id was not found');
    }
    res.send(student);
});

router.delete('/:id', async (req, res) => {
    const student = await studentmodel.findByIdAndDelete(req.params.id)
    if (!student) {
        return res.status(404).send('the student with the given id was not found');
    }
    res.send(student);
});

router.get('/:id', async (req, res) => {
    const student = await studentmodel.findById(req.params.id)
    if (!student) return res.status(404).send('the student with given id was not found');
    res.send(student);
});

module.exports = router