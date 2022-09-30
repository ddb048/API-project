const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, Venue, Event, Attendance, EventImage, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateCreateEvent, validatePagination } = require('../../utils/validation');

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

//DELETE attendance by eventId
router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const userId = req.body.memberId;

    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found";
        return next(err);
    }

    const attendance = await Attendance.findOne({
        where: {
            eventId,
            userId
        },
        attributes: ['id', 'eventId', 'userId', 'status']
    });

    if (!attendance) {
        const err = new Error("Attendance does not exist for this User");
        err.status = 404;
        err.message = "Attendance does not exist for this User";
        return next(err);
    }

    attendance.destroy();

    res.json({ "message": "Successfully deleted attendance from event" });
})

//GET attendees by eventId
router.get('/:eventId/attendees', async (req, res, next) => {
    const { eventId } = req.params

    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found";
        return next(err);
    }

    const attendees = await User.scope("userAttendance").findAll({
        include: [{ model: Event, where: { id: eventId }, attributes: [] },
        { model: Attendance.scope("eventAttendees"), as: "Attendance" }]
    });

    const response = [];

    for (let i = 0; i < attendees.length; i++) {
        const attendee = {};
        attendee.id = attendees[i].id;
        attendee.firstName = attendees[i].firstName;
        attendee.lastName = attendees[i].lastName;
        attendee.Attendance = { "status": attendees[i].Attendance[0].dataValues.status }

        response.push(attendee);
    }

    res.json({ "Attendees": response })
})

//POST attendance by eventId
router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;

    const event = await Event.findOne({
        where: {
            id: eventId
        }
    });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found";
        return next(err);
    }

    const attendance = await Attendance.findOne({
        where: {
            userId: req.user.id,
            eventId
        }
    });

    if (attendance) {
        const status = attendance.dataValues.status;

        if (status === "pending") {
            const err = new Error("Attendance has already been requested");
            err.status = 404;
            err.message = "Attendance has already been requested";
            return next(err);
        }

        if (status === "member") {
            const err = new Error("User is already an attendee of the event");
            err.status = 400;
            err.message = "User is already an attendee of the event";
            return next(err);
        }
    }

    const invite = await Attendance.create({
        eventId,
        userId: req.user.id,
        status: "pending"
    });

    res.json({
        userId: invite.userId,
        status: invite.status
    });
});

//PUT attendance by eventId
router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {
    const { eventId } = req.params;
    const { userId, status } = req.body;

    const event = await Event.findByPk(eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.message = "Event couldn't be found";
        return next(err);
    }

    if (status === "pending") {
        const err = new Error("Cannot change an attendance status to pending");
        err.status = 400;
        err.message = "Cannot change an attendance status to pending";
    }

    const attendance = await Attendance.findOne({
        where: {
            eventId,
            userId
        },
        attributes: ['id', 'eventId', 'userId', 'status']
    });

    if (!attendance) {
        const err = new Error("Attendance between the user and the event does not exist");
        err.status = 404;
        err.message = "Attendance between the user and the event does not exist";
        return next(err);
    }

    const rsvp = await attendance.update({
        eventId,
        userId,
        status
    });

    const response = {};

    response.id = attendance.dataValues.id;
    response.eventId = rsvp.dataValues.eventId;
    response.userId = rsvp.dataValues.userId;
    response.status = rsvp.dataValues.status;

    res.json(response);
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
router.get('/', validatePagination, async (req, res, next) => {
    // let { page, size } = req.query;

    // if (!page) page = 1;
    // if (!size) size = 20;

    // page = parseInt(page);
    // size = parseInt(size);

    // if (page < 0) page = 1;
    // if (size < 0) size = 20;

    // if (Number.isNaN(page)) page = 1;
    // if (Number.isNaN(size)) size = 20;

    // let pagination = {}
    // pagination.limit = size;
    // pagination.offset = size * (page - 1);

    const event = await Event.findAll({
        include: [{ model: Group.scope("eventRoutes") },
        { model: Venue.scope("eventRoutes") }],
        // ...pagination
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
