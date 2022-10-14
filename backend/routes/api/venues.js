const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Venue, Event, Attendance, EventImage, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateCreateVenue } = require('../../utils/validation');

const router = express.Router();

router.put('/:venueId', requireAuth, validateCreateVenue, async (req, res, next) => {
    const { venueId } = req.params;
    const { address, city, state, lat, lng } = req.body;

    const venue = await Venue.findByPk(venueId);

    if (!venue) {
        const err = new Error("Venue couldn't be found");
        err.status = 404;
        err.message = "Venue couldn't be found";
        return next(err);
    }

    const updatedVenue = await venue.update({
        groupId: venue.dataValues.groupId,
        address,
        city,
        state,
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    })

    const response = {};
    response.groupId = updatedVenue.dataValues.groupId
    response.address = updatedVenue.dataValues.address
    response.city = updatedVenue.dataValues.city
    response.state = updatedVenue.dataValues.state
    response.lat = updatedVenue.dataValues.lat
    response.lng = updatedVenue.dataValues.lng;

    res.json(response);
})
module.exports = router;
