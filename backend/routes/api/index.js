const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const venuesRouter = require('./venues.js');
const eventsRouter = require('./events.js');
const groupImagesRouter = require('./group-images.js');
const eventImagesRouter = require('./event-images.js');
const { restoreUser, requireAuth } = require("../../utils/auth.js");
router.use(restoreUser);

// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.get('/test', requireAuth, (req, res) => {
    res.json({ message: 'success' })
})

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/groups', groupsRouter);

router.use('/venues', venuesRouter);

router.use('/events', eventsRouter);

router.use('/group-images', groupImagesRouter);

router.use('/event-images', eventImagesRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });


// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });



module.exports = router;
