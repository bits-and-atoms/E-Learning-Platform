const express = require('express');
const {categorymodel,validatedata} = require('../models/categoriesmodel');

const router = express.Router();
//we got this router and this can be associated to all routes

router.get('/', async (req, res) => {
    let categories = await categorymodel.find();
    res.send(categories);
});

router.post('/', async (req, res) => {
    const { error } = validatedata(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const category = new categorymodel({
        name: req.body.name
    });
    await category.save();
    res.send(category)
});

router.put('/:id', async (req, res) => {
    const { error } = validatedata(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const category = await categorymodel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    //The { new: true } option in the findByIdAndUpdate method of Mongoose specifies that the query should return the updated document instead of the original document.

    if (!category) {
        return res.status(404).send('the category with the given id was not found');
    }
    res.send(category);
});

router.delete('/:id', async (req, res) => {
    const category = await categorymodel.findByIdAndDelete(req.params.id)
    if (!category) {
        return res.status(404).send('the category with the given id was not found');
    }
    res.send(category);
});

router.get('/:id', async (req, res) => {
    const category = await categorymodel.findById(req.params.id)
    if (!category) return res.status(404).send('the category with given id was not found');
    res.send(category);
});

module.exports = router