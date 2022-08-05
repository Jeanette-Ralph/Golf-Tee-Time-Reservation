const router = require('express').Router();

// maybe call this userRoutes
const usernRoutes = require('./loginRoute');

router.use('/user', userRoutes);
// router.use('/bookings', bookingRoutes);

module.exports = router;