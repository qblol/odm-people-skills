const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
// CHANGE TO YOUR DESIRE DATABASE
mongoose.connect('mongodb://localhost/people-skills');

// CHANGE TO YOUR DESIRE ROUTES
const users = require('./routes/users');
app.use('/api/users', users);

app.listen(3000);

module.exports = app;
