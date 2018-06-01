const express = require('express');
const morgan = require('morgan');
const app = express();

// importing routes
const teamRoutes = require('./api/routes/teams');
const matchRoutes = require('./api/routes/matches');
const playerRoutes = require('./api/routes/players');

// Developing information about request
app.use(morgan('dev'));
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