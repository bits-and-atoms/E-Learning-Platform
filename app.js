const express = require('express')
const categories = require('./routes/categories.js')
const students = require('./routes/students.js')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config();
app.use(express.json())
app.use('/api/categories', categories)
app.use('/api/students', students)

const mongourl = process.env.mongourl;
mongoose.connect(mongourl).then(() => { console.log("successfull connection") }).catch(() => { console.error("cant connect") });

const port = process.env.PORT || 8081
app.listen(port, () => console.log(`listening on port ${port}...`));