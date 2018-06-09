const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//connect to mongoDB atalas
mongoose.connect('mongodb+srv://Darnock:'+ process.env.MONGODB_ATLAS_PW +'@worldcup-rest-bddeh.mongodb.net/test?retryWrites=false')

// importing routes
const teamRoutes = require('./api/routes/teams');
const matchRoutes = require('./api/routes/matches');
const playerRoutes = require('./api/routes/players');

// Developing information about request
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
// Parsing request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//adding CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Route handlers
app.use('/teams', teamRoutes);
app.use('/matches', matchRoutes);
app.use('/players', playerRoutes);

// if doesn't match the route, create error object in this middleware and pass it to the error handling middleware
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
// Handling Errors middleware
app.use((error, req, res, next, ) => {
    res.status(error.status || 500).json({
        message: error.message
    })
});


module.exports = app;