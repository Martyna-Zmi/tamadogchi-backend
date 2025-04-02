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
    .then(() => console.log('\x1b[32m MONGOOSE: Successfully connected to MongoDB \x1b[0m'))
    .catch((err) => {
        console.error(`\x1b[31m MONGOOSE: Failed to connect to MongoDB - \x1b[0m ${err.message}`);
        console.log("Shutting down...");
        process.exit(-1);
    });

app.use(express.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//log reqs
app.use((req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`\x1b[32m INCOMING HTTP ${method} \x1b[0m request at: [${timestamp}], request url: ${url}`);
    next();
});

app.use('/dogs', dogsRouter);
app.use('/foods', foodsRouter);

module.exports = app;
