const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix of users routes
router.use('/user', userRoutes);

module.exports = router;