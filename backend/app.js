const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());
const { ValidationError } = require('sequelize');


if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

const routes = require('./routes');

app.use(routes);







app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});





// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    let responseError = {};
    if (err.errors) {
        responseError.message = err.message;
        responseError.statusCode = err.status;
        responseError.errors = err.errors;
    } else {
        responseError.message = err.message;
        responseError.statusCode = err.status;
    }



    // stack: isProduction ? null : err.stack
    res.json(responseError);
});

module.exports = app;
