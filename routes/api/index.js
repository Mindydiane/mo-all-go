const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix of user routes
router.use('/user', userRoutes);
// add prefix of thought routes
router.use('/thought', thoughtRoutes);

module.exports = router;