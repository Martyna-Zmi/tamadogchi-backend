require('dotenv').config({path: './.env'});

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const dogsRouter = require('./routes/dogs');
const foodsRouter = require('./routes/foods');

const app = express();
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error(`Failed to connect to MongoDB: ${err.message}`)
        process.exit(-1);
    });

app.use(express.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//log reqs
app.use((req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`INCOMING HTTP ${method} request at: [${timestamp}], request url: ${url}`);
    next();
});

app.use('/dogs', dogsRouter);
app.use('/foods', foodsRouter);

module.exports = app;
