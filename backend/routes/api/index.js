const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null


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
