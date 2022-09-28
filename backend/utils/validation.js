const { validationResult, check } = require('express-validator');







// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const err = Error('Bad request.');
        const errors = validationErrors
            .array()
            .map((error) => [error.param, error.msg]);
        err.status = 400;
        err.errors = Object.fromEntries(errors);
        err.statusCode = 400;
        err.message = 'Validation error';
        next(err);
    }
    next();
};

const validateCreateGroup = [
    check("name")
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 1, max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check("about")
        .exists({ checkFalsy: true })
        .isLength({ min: 50, max: 500 })
        .withMessage("About must be 50 characters or more"),
    check("type")
        .exists({ checkFalsy: true })
        .isIn(["In person", "Online"])
        .withMessage("Type must be 'Online' or 'In person'"),
    check("private")
        .exists()
        .isBoolean()
        .withMessage("Private must be a boolean"),
    check("state")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors, validateCreateGroup
};
