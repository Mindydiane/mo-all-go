const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of user routes
router.use('/user', userRoutes);
// add prefix of thoughts routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;