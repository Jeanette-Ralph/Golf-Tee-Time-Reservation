// to fix an error
const router = require("express").Router();
const { Teetimes, User } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage because we are not logged in yet.
// Render all of the tetimes
router.get('/', async (req, res) => {
  try {
    const dbTeetimesData = await Teetimes.findAll({
    });

    const teetimes = dbTeetimesData.map((teetimes) =>
      teetimes.get({ plain: true })
    );
    res.render('home', {
      teetimes
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/user', withAuth, async (req, res) => {
  res.render('landingPage',);
});

module.exports = router;
