const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Venue, Event, Attendance, EventImage, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateCreateEvent } = require('../../utils/validation');

const router = express.Router();

//POST image by eventId
router.post('/:eventId/images', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { url, preview } = req.body;

    const event = await Event.findOne({
        where: {
            id: eventId
        }
    });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found"
        return next(err);
    }

    const newImage = await EventImage.create({
        eventId,
        url,
        preview
    });

    res.json({
        id: newImage.dataValues.id,
        url: newImage.dataValues.url,
        preview: newImage.dataValues.preview
    })
})

//PUT edit event by eventId
router.put('/:eventId', requireAuth, validateCreateEvent, async (req, res, next) => {
    const { eventId } = req.params;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    const event = await Event.findByPk(eventId);
    const venue = await Venue.findByPk(venueId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found";
        return next(err);
    }

    if (!venue) {
        const err = new Error("Venue couldn't be found");
        err.status = 404;
        err.message = "Venue couldn't be found";
        return next(err);
    }

    const newEvent = await event.update({
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate
    });

    const response = {};
    response.id = newEvent.dataValues.id
    response.venueId = newEvent.dataValues.venueId
    response.name = newEvent.dataValues.name
    response.type = newEvent.dataValues.type
    response.capacity = newEvent.dataValues.capacity
    response.price = newEvent.dataValues.price
    response.description = newEvent.dataValues.description
    response.startDate = newEvent.dataValues.startDate
    response.endDate = newEvent.dataValues.endDate;

    res.json(response)
})

//DELETE event by eventId
router.delete('/:eventId', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found";
        return next(err);
    }

    event.destroy();

    res.json({
        "message": "Successfully deleted"
    })
})

//GET events by eventId
router.get('/:eventId', async (req, res, next) => {
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId, {
        include: [{ model: Group.scope("eventIdRoutes") },
        { model: Venue.scope("eventIdRoutes") },
        { model: EventImage.scope("eventIdRoutes") }]
    });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found";
        return next(err);
    }

    let numAttending = await Attendance.count({
        where: {
            eventId: eventId
        }
    })

    event.dataValues.numAttending = numAttending;

    res.json(event)
})

//GET all events
router.get('/', async (req, res, next) => {

    const event = await Event.findAll({
        include: [{ model: Group.scope("eventRoutes") },
        { model: Venue.scope("eventRoutes") }]
    })

    for (let i = 0; i < event.length; i++) {
        let numAttending = await Attendance.count({
            where: {
                eventId: event[i].dataValues.id
            }
        });

        event[i].dataValues.numAttending = numAttending;

        let previewImage = await EventImage.findOne({
            where: {
                eventId: event[i].dataValues.id,
                preview: true
            }
        });

        if (previewImage) {
            event[i].dataValues.previewImage = previewImage.url;
        } else {
            event[i].dataValues.previewImage = null;
        }
    }

    res.json({ Events: event })
});

module.exports = router;
