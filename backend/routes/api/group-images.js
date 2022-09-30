const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Venue, Event, Attendance, EventImage, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateCreateEvent } = require('../../utils/validation');

const router = express.Router();


//DELETE groupImage by imageId
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;

    const image = await GroupImage.findOne({
        where: {
            id: imageId
        }
    });

    if (!image) {
        const err = new Error("Group image couldn't be found");
        err.status = 404;
        err.message = "Group image couldn't be found";
        return next(err);
    };

    image.destroy();

    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });

})

module.exports = router;
