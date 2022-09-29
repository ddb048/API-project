const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Group, Event, Venue, Membership, Attendance, EventImage, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateCreateGroup } = require('../../utils/validation');

const router = express.Router();

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

//DELETE groups by groupId
router.delete('/:groupId', requireAuth, async (req, res) => {
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


//GET groups by current user
router.get('/current', requireAuth, async (req, res, next) => {
    const currentGroups = await Group.findAll({
        where: {
            organizerId: req.user.id
        }
    });

    const currentMembership = await Group.findAll({
        include: {
            attributes: [],
            model: Membership,
            as: "groupMemberIds",
            where: {
                userId: req.user.id
            }
        }
    })
    const combinedList = [...currentGroups, ...currentMembership];

    for (let i = 0; i < combinedList.length; i++) {
        let numMembers = await Membership.count({
            where: {
                groupId: combinedList[i].dataValues.id
            }
        });
        console.log(numMembers);
        combinedList[i].dataValues.numMembers = numMembers;
        console.log(combinedList[i].dataValues.numMembers)
        let previewImage = await GroupImage.findAll({
            where: {
                groupId: combinedList[i].dataValues.id,
                preview: true
            }
        });

        if (previewImage.length) {
            combinedList[i].dataValues.previewImage = previewImage[0].url;
        } else {
            combinedList[i].dataValues.previewImage = null;
        }

    }

    res.json({ Groups: combinedList })
})
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
            { model: Venue }
        ]
    })

    if (!group.length) {
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
            allGroups[i].dataValues.previewImage = previewImage.url
        } else {
            allGroups[i].dataValues.previewImage = null;
        }
    }
    res.json({ "Groups": allGroups });
})
module.exports = router;
