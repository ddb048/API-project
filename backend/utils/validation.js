const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const err = validationErrors
            .array()
            .map((error) => [error.param, error.msg]);

        err.errors = Object.fromEntries(errors);
        err.statusCode = 400;
        err.message = 'Validation error.';
        next(err);
    }
    next();
};

module.exports = {
    handleValidationErrors
};
