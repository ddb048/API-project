const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Event, Venue, Membership, Attendance, EventImage, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateCreateGroup, validateCreateVenue, validateCreateEvent } = require('../../utils/validation');

const router = express.Router();

//PUT members by groupId

//POST members by groupId
router.post('/:groupId/membership', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;

    const userId = req.user.id;

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found";
        return next(err);
    }

    const members = await Membership.findOne({
        where: {
            userId: req.user.id,
            groupId: groupId
        }
    });

    if (members) {
        const status = members.dataValues.status;

        if (status === "pending") {
            const err = new Error("Membership has already been requested");
            err.status = 400;
            err.message = "Membership has already been requested";
            return next(err);
        } else if (status === "member") {
            const err = new Error("User is already an accepted member of the group");
            err.status = 400;
            err.message = "User is already an accepted member of the group";
            return next(err);
        }
    }

    const member = await Membership.scope("newMember").create({
        groupId: groupId,
        userId,
        status: "pending"
    });

    const response = {};

    response.groupId = member.dataValues.groupId;
    response.memberId = member.dataValues.userId;
    response.status = member.dataValues.status;

    res.json(response);
})


//GET members by members
router.get('/:groupId/members', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;

    let group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found";
        return next(err);
    }

    const groupMembers = await User.scope("userMembership").findAll({
        include: [{
            model: Membership.scope("userMembership"),
            as: "Membership",
            where: {
                groupId: groupId
            }
        }],
    });

    const { organizerId } = group.dataValues;
    const { user } = req;

    if (organizerId !== user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        err.message = "Forbidden";
        return next(err);
    }

    for (let i = 0; i < groupMembers.length; i++) {
        groupMembers[i].Membership = { status: groupMembers[i]["Membership.status"] };
        groupMembers[i]["Membership.status"] = undefined;
    }

    res.json({ Members: groupMembers })
})

//GET venues by groupId
router.get('/:groupId/venues', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;

    const venues = await Venue.scope("allVenuesRoutes").findAll({
        where: { groupId: groupId }
    });

    if (!venues) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found";
        return next(err);
    }

    res.json({ Venues: venues })
})
//POST venues by groupId
router.post('/:groupId/venues', requireAuth, validateCreateVenue, async (req, res, next) => {
    const { groupId } = req.params
    const { address, city, state, lat, lng } = req.body

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found";
        return next(err);
    }

    const venue = await Venue.create({
        groupId,
        address,
        city,
        state,
        lat,
        lng
    });

    const resVenue = {};

    resVenue.id = venue.dataValues.id;
    resVenue.groupId = venue.dataValues.groupId;
    resVenue.address = venue.dataValues.address;
    resVenue.city = venue.dataValues.city;
    resVenue.state = venue.dataValues.state;
    resVenue.lat = venue.dataValues.lat;
    resVenue.lng = venue.dataValues.lng;

    res.json(resVenue)

})
//GET events by groupId
router.get('/:groupId/events', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found";
        return next(err);
    }

    const events = await Event.findAll({
        where: {
            groupId: groupId
        },
        attributes: {
            exclude: ['capacity', 'price']
        },
        include: [{ model: Group.scope('eventRoutes') }, { model: Venue.scope('eventRoutes') }]
    });

    for (let i = 0; i < events.length; i++) {
        const numAttending = await Attendance.count({
            where: {
                eventId: events[i].dataValues.id
            }
        });

        events[i].dataValues.numAttending = numAttending;


        let previewImage = await EventImage.findOne({
            where: {
                eventId: events[i].dataValues.id,
                preview: true
            }
        });

        if (previewImage) {
            events[i].dataValues.previewImage = previewImage.url;
        } else {
            events[i].dataValues.previewImage = null;
        }
    }

    res.json({ Events: events })
})

//POST to event by groupId
router.post('/:groupId/events', requireAuth, validateCreateEvent, async (req, res, next) => {
    const { groupId } = req.params;
    const { venueId, name, type, capacity,
        price, description, startDate, endDate } = req.body;

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found";
        return next(err)
    }

    const newEvent = await Event.create({
        groupId: groupId,
        venueId,
        name,
        type,
        capacity,
        price: (parseFloat(price)),
        description,
        startDate,
        endDate
    });


    const response = {};
    response.id = newEvent.dataValues.id
    response.groupId = newEvent.dataValues.groupId
    response.venueId = newEvent.dataValues.venueId
    response.name = newEvent.dataValues.name
    response.type = newEvent.dataValues.type
    response.capacity = newEvent.dataValues.capacity
    response.price = newEvent.dataValues.price
    response.description = newEvent.dataValues.description
    response.startDate = newEvent.dataValues.startDate
    response.endDate = newEvent.dataValues.endDate;

    res.json(response);
})

//POST an image to groups by groupId
router.post('/:groupId/images', requireAuth, async (req, res, next) => {
    const { groupId } = req.params
    const { url, preview } = req.body

    const group = await Group.findOne({
        where: {
            id: groupId
        }
    })

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Not Found";
        return next(err);
    }

    const newImage = await GroupImage.create({
        groupId,
        url,
        preview
    });

    res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })
})

//GET by current
router.get('/current', requireAuth, async (req, res, next) => {
    const ownedGroup = await Group.findAll({
        where: {
            organizerId: req.user.id
        }
    });

    const memberGroup = await Group.findAll({
        include: {
            attributes: [],
            model: Membership,
            as: "groupMemberIds",
            where: {
                userId: req.user.id
            }
        }
    });

    const combinedList = [...ownedGroup, ...memberGroup];

    for (let i = 0; i < combinedList.length; i++) {
        let numMembers = await Membership.count({
            where: {
                groupId: combinedList[i].dataValues.id
            }
        });

        combinedList[i].dataValues.numMembers = numMembers

        let previewImage = await GroupImage.findOne({
            where: {
                groupId: combinedList[i].dataValues.id,
                preview: true
            }
        });

        if (previewImage) {
            combinedList[i].dataValues.previewImage = previewImage.url;
        } else {
            combinedList[i].dataValues.previewImage = null;
        }
    }

    res.json({ Groups: combinedList })

})

//DELETE groups by groupId
router.delete('/:groupId', requireAuth, async (req, res, next) => {
    const { groupId } = req.params;

    const group = await Group.findOne({
        where: {
            id: groupId
        }
    })

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found";
        return next(err);
    }

    await group.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    });
});


//PUT update groups by groupId
router.put('/:groupId', requireAuth, validateCreateGroup, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;
    const { groupId } = req.params;

    const group = await Group.findOne({
        where: {
            id: groupId
        }
    })

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be Found";
        return next(err);
    }

    const updateGroup = await group.update({
        name,
        about,
        type,
        private,
        city,
        state
    })

    res.json({
        name: updateGroup.name,
        about: updateGroup.about,
        type: updateGroup.type,
        private: updateGroup.private,
        city: updateGroup.city,
        state: updateGroup.state
    })
});

//GET groups by groupId
router.get('/:groupId', async (req, res, next) => {
    const { groupId } = req.params
    const group = await Group.findAll({
        where: {
            id: groupId
        },
        include: [
            { model: GroupImage },
            { model: User.scope('organizer'), as: "Organizer" },
            { model: Venue.scope('allVenuesRoutes') }
        ]
    })

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.message = "Group couldn't be found";
        return next(err);
    }

    for (let i = 0; i < group.length; i++) {
        let numMembers = await Membership.count({
            where: {
                groupId: group[i].dataValues.id
            }
        });
        group[i].dataValues.numMembers = numMembers;
    }

    res.json(group[0])
})

//POST new group
router.post('/', requireAuth, validateCreateGroup, async (req, res, next) => {
    const { name, about, type, private, city, state } = req.body;

    const newGroup = await Group.create({
        organizerId: req.user.id,
        name,
        about,
        type,
        private,
        city,
        state
    })
    res.status(201);
    res.json(newGroup);
})

//GET all groups
router.get('/', async (req, res, next) => {
    let allGroups = await Group.findAll();

    for (let i = 0; i < allGroups.length; i++) {
        let numMembers = await Membership.count({
            where: {
                groupId: allGroups[i].dataValues.id
            }
        });

        let previewImage = await GroupImage.findOne({
            where: {
                groupId: allGroups[i].dataValues.id,
                preview: true
            }
        });

        allGroups[i].dataValues.numMembers = numMembers;

        if (previewImage) {
            allGroups[i].dataValues.previewImage = previewImage.dataValues.url
        } else {
            allGroups[i].dataValues.previewImage = null;
        }
    }
    res.json({ "Groups": allGroups });
})
module.exports = router;
