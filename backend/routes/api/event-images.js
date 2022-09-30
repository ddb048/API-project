const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Venue, Event, Attendance, EventImage, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateCreateEvent } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;

    const image = await EventImage.findOne({
        where: {
            id: imageId
        }
    });

    if (!image) {
        const err = new Error("Event image couldn't be found");
        err.status = 404;
        err.message = "Event image couldn't be found";
        return next(err);
    }

    image.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });

})

module.exports = router;
